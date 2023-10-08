import os
import pathlib
import requests
from flask_login import login_user
from app.models import User, db
from flask import Blueprint, session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests

oauth_routes = Blueprint("oauth", __name__)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_OAUTH_CLIENT_ID")
UNAUTHORIZED_REDIRECT_URI = 'http://localhost:5000/api/oauth/callback' if os.environ.get('FLASK_ENV') == 'development' else 'https://feedium.onrender.com/api/oauth/callback'
AUTHORIZED_REDIRECT_URI = 'http://localhost:3000/all' if os.environ.get('FLASK_ENV') == 'development' else 'https://feedium.onrender.com/all'
PW=os.environ.get("PW")

if os.environ.get("FLASK_ENV") == "development":
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri=UNAUTHORIZED_REDIRECT_URI
)


@oauth_routes.route("/google-login")
def google_login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@oauth_routes.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    oauth_user_firstname = id_info["given_name"]
    oauth_user_lastname = id_info["family_name"]
    oauth_user_username = f"{oauth_user_firstname[0:1].lower()}{oauth_user_lastname.lower()}"

    old_user = User.query.filter((User.email == id_info.get("email") or User.username == oauth_user_username)).first()

    if not old_user:
        pro_pic = "https://feedium-bucket.s3.amazonaws.com/default.jpeg"
        new_user = User(
            first_name=oauth_user_firstname,
            last_name=oauth_user_lastname,
            username=oauth_user_username,
            email=id_info["email"],
            password=PW,
            profile_pic=pro_pic
        )

        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
    else:
        login_user(old_user)

    return redirect(AUTHORIZED_REDIRECT_URI)
