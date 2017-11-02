from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int(required=True)
    email = fields.Str(required=True)
    username = fields.Str(required=True)


class ClientSchema(Schema):
    id = fields.Int(required=True)
    cid = fields.Str(required=True)


class RefreshTokenSchema(Schema):
    id = fields.UUID(required=True)
    user_id = fields.Int(required=True)
    client_id = fields.Int(required=True)
    revoke = fields.Boolean(required=True)
    ip_address = fields.Str(required=True)
    user_agent = fields.Str(required=True)
