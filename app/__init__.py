from gevent import monkey
monkey.patch_all()

import os
from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit

from app.config import DevConfig


app = Flask(__name__, static_folder="assets")
app.config.from_object(DevConfig)

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{os.environ['DATABASE_USER']}:{os.environ['DATABASE_PASSWORD']}@127.0.0.1:5432/{os.environ['DATABASE_NAME']}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
socketio = SocketIO(app)


from app import routes

with app.app_context():
    db.create_all()
