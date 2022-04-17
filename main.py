import os
from dotenv import load_dotenv
from app import socketio
from app import app





if __name__ == '__main__':
    load_dotenv()
    socketio.run(app, host="0.0.0.0", port=8681, debug=True)