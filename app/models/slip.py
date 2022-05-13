import code
from datetime import datetime
from app import db
from app.models import games

class Slip(db.Model):
    __tablename__ = 'slip'
    
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    code = db.Column(db.String(255), nullable=False)
    odds = db.Column(db.Float(), nullable=False)
    expired = db.Column(db.Boolean(), default=False)
    created_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    expiry_date = db.Column(db.DateTime, nullable=True)
    games = db.relationship("Game", backref="slip", lazy=True)
    
    def as_display(self):
        return {'id': self.id, 'code': self.code, 'odds': self.odds, 'expired': self.expired, 'created_at': datetime.isoformat(self.created_at), 'expiry_date': self.expiry_date, "games": len(self.games)}
        
    
    def as_dict(self):
        data = {  }
        data["games"] = []
        for c in self.__table__.columns:
            if isinstance(getattr(self, c.name), datetime):
                data.update({c.name : getattr(self, c.name).isoformat()})
            else:
                data.update({c.name : getattr(self, c.name)})
        for game in self.games:
            data["games"].append(game.as_dict())
        return data 
    