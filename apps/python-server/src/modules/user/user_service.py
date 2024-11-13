from models import User

class UserService:
    @staticmethod
    def find_by_id(id):
        user = User.query.get(id)
        
        return user
    
    def find_all(id):
        users = User.query.filter(User.id != id).all()

        return users