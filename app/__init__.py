import os ,time, json
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
import redis
from rq import Queue


from app.scraper.main import generator
from app.config import DevConfig


app = Flask(__name__, static_folder="assets")
app.config.from_object(DevConfig())
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
socketio = SocketIO(app)


conn_redis = redis.Redis()
queue = Queue(connection=conn_redis)

def fetch_data():
    data = []
    with open(f"{os.getcwd()}/app/data/games.json") as f:
        data = json.load(f)
    return data



@app.route("/")
def home():
    return render_template('index.html')



@socketio.on("connect")
def handle_connect():
    data = fetch_data()
    emit("data", data)
  
      
@socketio.on("generate")
def handle_generate(data):
    if data["start"]:
        job = queue.enqueue(generator, 15, job_timeout=3600)

        while job.result == None:
            time.sleep(2)
        
        data = fetch_data()
        emit("data", data)


@socketio.on("fetch")
def handle_fetch(data):
    if data["get"]:
        data = fetch_data()
        emit("data", data)