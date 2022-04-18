from datetime import datetime
from sqlalchemy import event, DDL
from app import db


class Zero(db.Model):
    __tablename__ = 'zero'
    
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    code = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def as_dict(self):
        data = {}
        for c in self.__table__.columns:
            if isinstance(getattr(self, c.name), datetime):
                data.update({c.name : getattr(self, c.name).isoformatt()})
            else:
                data.update({c.name : getattr(self, c.name)})
        return data


event.listen(Zero.__table__, 'after_create', DDL(""" INSERT INTO zero (code) VALUES ('BC8GMS6X') """ ))