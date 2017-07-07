from datetime import datetime

import enum
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import PasswordType


Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True
    pass


class User(BaseModel):
    """ User Model for storing user related details """
    __tablename__ = "users"

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.String(255), unique=True, nullable=False)
    username = sa.Column(sa.String(255), unique=True, nullable=False)
    password = sa.Column(PasswordType(
        schemes=[
            'pbkdf2_sha512',
            'md5_crypt'
        ],
        deprecated=['md5_crypt']
    ), unique=False, nullable=False, )
    created_at = sa.Column(
        sa.DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    updated_at = sa.Column(
        sa.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )


class Client(BaseModel):
    """ Client Model for storing client app related details """
    __tablename__ = "clients"

    id = sa.Column(sa.Integer, primary_key=True)
    cid = sa.Column(sa.String(50), unique=True, nullable=False)
    secret = sa.Column(sa.String(255), unique=True, nullable=False)
    name = sa.Column(sa.String(255), unique=True, nullable=False)
    application_type = sa.Column(sa.String(255), unique=True, nullable=False)
    active = sa.Column(sa.Boolean, unique=False, nullable=False, default=True)
    refresh_token_time = sa.Column(sa.Numeric(8, 0), unique=False, nullable=False, default=14400)
    allowed_origin = sa.Column(sa.String(255), unique=False, nullable=False, default='*')



class RefreshToken(BaseModel):
    """ RefreshToken Model for storing refresh token related details """
    __tablename__ = "refresh_tokens"

    id = sa.Column(sa.Integer, primary_key=True)
    token = sa.Column(sa.String(50), unique=True, nullable=False)
    issued_at = sa.Column(
        sa.DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    expired_at = sa.Column(
        sa.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

