from datetime import datetime
from app import db

class Game(db.Model):
    __tablename__ = 'game'
    
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    match = db.Column(db.Text(), nullable=False)
    option = db.Column(db.String(255), nullable=False)
    odds = db.Column(db.Float(), nullable=False)
    expiry = db.Column(db.Boolean(), nullable=True)
    match_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    slip_id = db.Column(db.Integer, db.ForeignKey("slip.id"), nullable=False)
    
    
    def as_dict(self):
        data = {}
        for c in self.__table__.columns:
            if isinstance(getattr(self, c.name), datetime):
                data.update({c.name : getattr(self, c.name).isoformat()})
            else:
                data.update({c.name : getattr(self, c.name)})
        return data