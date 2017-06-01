from nameko.rpc import rpc
from models import DeclarativeBase, User

class Auth(object):
    name = "auth"

    @rpc
    def new(self, username):
        return username
