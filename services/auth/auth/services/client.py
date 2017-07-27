from nameko.rpc import rpc
from nameko_sqlalchemy import DatabaseSession
from base64 import b64decode
from ..models import Base, Client
from ..schemas import ClientSchema


class ClientService(object):
    name = "client"

    db = DatabaseSession(Base)

    @rpc
    def get(self, ecoded_cid):
        cid = b64decode(ecoded_cid)
        client = self.db.query(Client).filter_by(cid = cid).first()
        return ClientSchema().dump(client).data
