from flask import Flask
from flask_jwt_extended import JWTManager
from sqlalchemy import inspect
from flask_cors import CORS

from models import db, Message
from config import Config
from modules.message.message_controller import message_bp
from modules.chat.chat_controller import chat_bp

app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

db.init_app(app)

jwt = JWTManager(app)

app.register_blueprint(message_bp)
app.register_blueprint(chat_bp)

def create_tables():
    with app.app_context():
        inspector = inspect(db.engine)

        if 'Message' not in inspector.get_table_names():
            Message.__table__.create(db.engine)

create_tables()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
