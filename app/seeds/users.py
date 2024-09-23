from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo users, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', lastname='User', email='demo@aa.io', password='password', role_id = 2
    )
    marnie = User(
        firstname='Marnie', lastname='Smith', email='marnie@aa.io', password='password'
    )
    bobbie = User(
        firstname='Bobbie', lastname='Brown', email='bobbie@aa.io', password='password'
    )
    andres = User(
        firstname='Andres', lastname='Martinez', email='andres@aa.io', password='password', role_id = 2
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(andres)
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
