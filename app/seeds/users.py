from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password', profile_pic='https://pyxis.nymag.com/v1/imgs/29b/bae/50c47f603f465c28cc385853c6a36169c1-29-steve-brule-check-it-out.rsquare.w700.jpg')
    marnie = User(
        username='marnie', first_name='Marnie', last_name='Johnson', email='marnie@aa.io', password='password', profile_pic='https://img.buzzfeed.com/buzzfeed-static/static/2016-10/28/9/asset/buzzfeed-prod-fastlane01/sub-buzz-6490-1477663180-5.jpg')
    bobbie = User(
        username='bobbie', first_name='Bobbie', last_name='Doe', email='bobbie@aa.io', password='password', profile_pic='https://static.onecms.io/wp-content/uploads/sites/6/2004/08/14493__rj_l.jpg')
    jon = User(
        username='jon', first_name='Jon', last_name='Ezana', email='jon@aa.io', password='password', profile_pic='https://static.wikia.nocookie.net/boondockstv/images/a/af/Hueyfreeman-jpg.png/')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
