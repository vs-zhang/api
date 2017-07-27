from nameko.rpc import rpc
from nameko_sqlalchemy import DatabaseSession
from ..models import Base, BaseModel, User
from ..schemas import UserSchema

class UserService(object):
    name = "user"

    db = DatabaseSession(Base)

    @rpc
    def create(self, username, email, password):
        user = User(
            username = username,
            email = email,
            password = password,
        )
        self.db.add(user)
        self.db.commit()
        user = UserSchema().dump(user).data
        return user

    @rpc
    def get(self, id):
        user = self.db.query(User).get(id)
        return UserSchema().dump(user).data

    @rpc
    def login(self, username, pwd):
        user = self.db.query(User).filter_by(username = username).first()
        if user.password == pwd:
            return UserSchema().dump(user).data

    @rpc
    def login_with_token(self, token):
        user_id = self._decode_auth_token(token)
        user = self.db.query(User).get(user_id)
        return UserSchema().dump(user).data

    @rpc
    def delete(self, id):
        user = self.db.query(User).get(id)
        self.db.delete(user)
        self.db.commit()
