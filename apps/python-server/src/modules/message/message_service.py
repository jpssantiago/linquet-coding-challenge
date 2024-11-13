from sqlalchemy import or_
from datetime import datetime

from models import db, Message

class MessageService:
    @staticmethod
    def create(sender_id, receiver_id, content):
        message = Message(senderId=sender_id, content=content, receiverId=receiver_id)
        db.session.add(message)
        db.session.commit()

        return message

    @staticmethod
    def get_conversation(sender_id, receiver_id):
        messages = Message.query.filter(
            or_(
                (Message.senderId == sender_id) & (Message.receiverId == receiver_id),
                (Message.senderId == receiver_id) & (Message.receiverId == sender_id)
            )
        ).order_by(Message.createdAt).all()

        return messages