import time
import redis
from app.models import *
from flask import render_template
from rq import Queue

from app import app, socketio, emit, db


conn_redis = redis.Redis()
queue = Queue(connection=conn_redis)


def fetch_slips():
    data = []
    for slip in Slip.query.order_by(Slip.created_at.desc()).all()[:100]:
        data.append(slip.as_display())
    return data

def fetch_slip(code):
    data = []
    for slip in Slip.query.filter(Slip.code == code).all():
        data.append(slip.as_dict())
    return data


@app.route("/")
def home():
    return render_template('index.html')


@socketio.on("connect")
def handle_connect():
    result = fetch_slips()
    emit("data", {"activity": "connection", "data": result })
  
      
@socketio.on("generate")
def handle_generate(data):
    from app.scraper.main import generator
    
    if data["start"] and data['country']:
        job = queue.enqueue(generator, args=(50, data['country']), job_timeout=3600)

        while job.result == None:
            time.sleep(2)
        
        result = fetch_slips()
        emit("data", {"activity": "generation", "data": result })


@socketio.on("fetch")
def handle_fetch(data):
    if data["get"]:
        result = fetch_slips()
        emit("data", {"activity": "fetching",  "data": result })
        

@socketio.on("single-slip")
def handle_single_slip(data):
    if data['code']:
        result = fetch_slip(data['code'])[0]
        emit('single', result)

@socketio.on("initslip")
def handle_init_slip(data):
    if data["code"] and data["country"] and data["date"]:
        addone = Zero(code=data['code'], country=data['country'], created_at=data['date'])
        db.session.add(addone)
        db.session.commit()
        print("Data added")
        