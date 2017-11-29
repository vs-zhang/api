from nameko.rpc import rpc
from nameko_sqlalchemy import DatabaseSession
from sqlalchemy import case
from ..models import Base, RefreshToken, Client
from ..schemas import RefreshTokenSchema

TokensSchema = RefreshTokenSchema(many=True)

class RefreshTokenService(object):
    name = "refresh_token"

    db = DatabaseSession(Base)

    @rpc
    def create(self, uid, cid, ip_address, user_agent):
        token = RefreshToken(
            user_id=uid,
            client_id=cid,
            ip_address=ip_address,
            user_agent=user_agent
        )
        self.db.add(token)
        self.db.commit()
        refresh_token = RefreshTokenSchema().dump(token).data
        return refresh_token

    @rpc
    def get(self, token_uuid):
        refresh_token = self.db.query(RefreshToken).get(token_uuid)
        return RefreshTokenSchema().dump(refresh_token).data

    @rpc
    def get_tokens(self, id, uid):
        refresh_tokens = self.db.query(RefreshToken.id, RefreshToken.ip_address, RefreshToken.user_agent, RefreshToken.user_id, case([(RefreshToken.id==id, True)], else_=False).label("is_current")).filter_by(user_id = uid, revoke = False)
        return TokensSchema.dump(refresh_tokens).data

    @rpc
    def set_revoke(self, token_uuid):
        refresh_token = self.db.query(RefreshToken).get(token_uuid)
        refresh_token.revoke = True
        self.db.commit()
        return RefreshTokenSchema().dump(refresh_token).data
