from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.jwt_utils import validate_jwt_token
from ..user.user_service import UserService
from ..message.message_service import MessageService

chat_bp = Blueprint("chat_bp", __name__)

class ChatController:
    @chat_bp.route("/api/v1/chats")
    @staticmethod
    @jwt_required()
    def get_users():
        token = request.headers.get("Authorization").split(" ")[1]
        if not validate_jwt_token(token):
            return jsonify({ "msg": "Authorization token is invalid" }), 401

        sender_id = get_jwt_identity()        
        users = UserService.find_all(sender_id)

        chats = []

        for user in users:
            chats.append({
                "user": user.to_dict(),
                "messages": [message.to_dict() for message in MessageService.get_conversation(sender_id, user.id)]
            })

        return jsonify({"chats": chats}), 200