import "./OAuthLink.css";

export const OAuthLink = () => {
  let oauthUrl;
  const environment = process.env.NODE_ENV;
  environment === "development" ? oauthUrl = "http://localhost:5000/api/oauth/google-login" : oauthUrl = "https://feedium.onrender.com/api/oauth/google-login";

  return (
    <span className="oauth_span">
      <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"></img>
      <a href={oauthUrl} className="oauth_link">Continue with Google</a>
    </span>
  )
}
