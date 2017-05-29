from nameko.rpc import rpc

class User(object):
    name = "auth"

    @rpc
    def new(self, username):
        return username
