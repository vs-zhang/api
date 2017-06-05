from nameko.rpc import rpc
from models import Base, BaseModel, User
from schemas import UserSchema
from nameko_sqlalchemy import DatabaseSession
import jwt
import os
import datetime

class AuthService(object):
    name = "auth"

    db = DatabaseSession(Base)

    @rpc
    def create_user(self, username, email, password):
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
    def get_user(self, id):
        user = self.db.query(User).get(id)
        return UserSchema().dump(user).data

    @rpc
    def login(self, username, pwd):
        user = self.db.query(User).filter_by(username = username).first()
        if user.password == pwd:
            return self._encode_auth_token(user.id)

    @rpc
    def login_with_token(self, token):
        user_id = self._decode_auth_token(token)
        user = self.db.query(User).get(user_id)
        return UserSchema().dump(user).data

    @rpc
    def delete_user(self, id):
        user = self.db.query(User).get(id)
        self.db.delete(user)
        self.db.commit()

    def _encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                os.getenv('SECRET_KEY', 'SECRET'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    def _decode_auth_token(self, auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, os.getenv('SECRET_KEY', 'SECRET'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please login again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please login again.'
