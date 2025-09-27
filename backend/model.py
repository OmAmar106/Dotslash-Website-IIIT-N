from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer,primary_key = True,autoincrement = True)
    username = db.Column(db.String,nullable=False)
    password = db.Column(db.String)
    isadmin = db.Column(db.Integer,default=0)
    email = db.Column(db.String,nullable=False,unique=True)
    cf = db.Column(db.String)
    cftoken = db.Column(db.Integer)
    cc = db.Column(db.String)
    lc = db.Column(db.String)
    ac = db.Column(db.String)

