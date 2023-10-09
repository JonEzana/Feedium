from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():

   if environment == 'production':
      # Before seeding, truncate all tables prefixed with schema name
      db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")

   demo = User(
      username='demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password', profile_pic='https://pyxis.nymag.com/v1/imgs/29b/bae/50c47f603f465c28cc385853c6a36169c1-29-steve-brule-check-it-out.rsquare.w700.jpg')
   marnie = User(
      username='marnie', first_name='Marnie', last_name='Johnson', email='marnie@aa.io', password='password', profile_pic='https://img.buzzfeed.com/buzzfeed-static/static/2016-10/28/9/asset/buzzfeed-prod-fastlane01/sub-buzz-6490-1477663180-5.jpg')
   bobbie = User(
      username='bobbie', first_name='Bobbie', last_name='Doe', email='bobbie@aa.io', password='password', profile_pic='https://static.onecms.io/wp-content/uploads/sites/6/2004/08/14493__rj_l.jpg')
   jon = User(
      username='jon', first_name='Jon', last_name='Ezana', email='jon@aa.io', password='password', profile_pic='https://static.wikia.nocookie.net/boondockstv/images/a/af/Hueyfreeman-jpg.png/')

   db.session.add_all([demo, marnie, bobbie, jon])
   db.session.commit()

def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM users"))

  db.session.commit()
