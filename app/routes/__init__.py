import time
from unittest import result
import redis
from app.models import *
from flask import render_template
from rq import Queue

from app import app, socketio, emit


conn_redis = redis.Redis()
queue = Queue(connection=conn_redis)


def fetch_data():
    data = []
    for slip in Slip.query.all():
        data.append(slip.as_dict())
    return data


@app.route("/")
def home():
    return render_template('index.html')


@socketio.on("connect")
def handle_connect():
    result = fetch_data()
    emit("data", {"activity": "connection", "data": result })
  
      
@socketio.on("generate")
def handle_generate(data):
    from app.scraper.main import generator
    
    if data["start"]:
        job = queue.enqueue(generator, 50, job_timeout=3600)

        while job.result == None:
            time.sleep(2)
        
        result = fetch_data()
        emit("data", {"activity": "generation", "data": result })


@socketio.on("fetch")
def handle_fetch(data):
    if data["get"]:
        result = fetch_data()
        emit("data", {"activity": "fetching",  "data": result })