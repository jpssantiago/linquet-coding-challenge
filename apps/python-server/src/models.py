from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import cuid

db = SQLAlchemy()

class Message(db.Model):
    __tablename__ = 'Message'

    id = db.Column(db.String(25), primary_key=True, default=cuid.cuid)
    senderId = db.Column(db.String(50), db.ForeignKey('User.id'), nullable=False)
    receiverId = db.Column(db.String(50), db.ForeignKey('User.id'), nullable=False)
    content = db.Column(db.String(1500), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sender = db.relationship('User', foreign_keys=[senderId], backref='sentMessages')
    receiver = db.relationship('User', foreign_keys=[receiverId], backref='receivedMessages')

    def __init__(self, senderId, receiverId, content):
        self.senderId = senderId
        self.receiverId = receiverId
        self.content = content

    def to_dict(self):
        return {
            "id": self.id,
            "senderId": self.senderId,
            "receiverId": self.receiverId,
            "content": self.content,
            "createdAt": self.createdAt.isoformat(),
            "updatedAt": self.updatedAt.isoformat()
        }

class User(db.Model):
    __tablename__ = 'User'

    id = db.Column(db.String(25), primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(500), nullable=False)

    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
        }