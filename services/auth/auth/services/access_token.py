import os
from nameko.rpc import rpc
from nameko_sqlalchemy import DatabaseSession
import jwt
import datetime

class AccessTokenService(object):
    name = "access_token"

    @rpc
    def encode(self, user_id):
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

    @rpc
    def decode(self, auth_token):
        try:
            payload = jwt.decode(auth_token, os.getenv('SECRET_KEY', 'SECRET'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please login again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please login again.'
