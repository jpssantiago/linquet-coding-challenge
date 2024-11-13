from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.jwt_utils import validate_jwt_token
from .message_service import MessageService
from modules.user.user_service import UserService

message_bp = Blueprint("message_bp", __name__)

class MessageController:
    @message_bp.route("/api/v1/message", methods=["POST"])
    @staticmethod
    @jwt_required()
    def send_message():
        data = request.get_json()
        content = data.get('content')
        receiver_id = data.get('receiver')

        if not content or not receiver_id:
            return jsonify({"message": "Content and receiver are required"}), 400

        token = request.headers.get("Authorization").split(" ")[1]
        if not validate_jwt_token(token):
            return jsonify({ "msg": "Authorization token is invalid" }), 401
        
        sender_id = get_jwt_identity()
        if sender_id == receiver_id:
            return jsonify({ "msg": "The receiver cannot be the same as the sender" }), 400
        
        receiver = UserService.find_by_id(receiver_id)
        if not receiver:
            return jsonify({ "message": "Receiver does not exist" }), 404
        
        message = MessageService.create(sender_id, receiver_id, content)
        return jsonify({ 
            "message": {
                "id": message.id, 
                "content": message.content, 
                "senderId": message.senderId,
                "receiverId": message.receiverId
            }
        }), 201