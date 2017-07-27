from nameko.rpc import rpc
from nameko_sqlalchemy import DatabaseSession
from ..models import Base, RefreshToken
from ..schemas import RefreshTokenSchema
from ..utils import decode_refresh_token, encode_refresh_token

class RefreshTokenService(object):
    name = "refresh_token"

    db = DatabaseSession(Base)

    @rpc
    def create(self, uid, cid, ip_address, user_agent):
        token = RefreshToken(
            user_id = uid,
            client_id = cid,
            ip_address = ip_address,
            user_agent = user_agent
        )
        self.db.add(token)
        self.db.commit()
        refreshToken = RefreshTokenSchema().dump(token).data
        return encode_refresh_token(refreshToken['id'])

    @rpc
    def get(self, token):
        token_uuid = decode_refresh_token(token)
        refresh_token = self.db.query(RefreshToken).get(token_uuid)
        return RefreshTokenSchema().dump(refresh_token).data
