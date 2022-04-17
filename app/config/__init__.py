import os 
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")


class ProdConfig(Config):
    DEBUG = False

class DevConfig(Config):
    DEVELOPMENT = True
    DEBUG = True