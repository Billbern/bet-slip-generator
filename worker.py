import os
import redis
from rq import Worker, Queue, Connection


conn_redis = redis.from_url("redis://localhost:6379")

with Connection(conn_redis):
    worker = Worker(list(map(Queue, ['default'])))
    worker.work()