from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int(required=True)
    email = fields.Str(required=True)
    username = fields.Str(required=True)
