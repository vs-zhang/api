from datetime import datetime

import enum
import uuid
from ipaddress import ip_address
import sqlalchemy as sa
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import PasswordType, ChoiceType, UUIDType, IPAddressType


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
    tokens = relationship("RefreshToken", back_populates="user")


class ApplicationType(enum.Enum):
    webapp = 1
    mobile = 2


class Client(BaseModel):
    """ Client Model for storing client app related details """
    __tablename__ = "clients"

    id = sa.Column(sa.Integer, primary_key=True)
    cid = sa.Column(sa.String(50), unique=True, nullable=False, index=True)
    secret = sa.Column(sa.String(255), unique=True, nullable=False)
    name = sa.Column(sa.String(255), unique=True, nullable=False)
    application_type = sa.Column(ChoiceType(ApplicationType, impl=sa.Integer()), unique=True, nullable=False, default=1)
    active = sa.Column(sa.Boolean, unique=False, nullable=False, default=True)
    refresh_token_time = sa.Column(sa.Numeric(8, 0), unique=False, nullable=False, default=14400)
    allowed_origin = sa.Column(sa.String(255), unique=False, nullable=False, default='*')
    tokens = relationship("RefreshToken", back_populates="client")


class RefreshToken(BaseModel):
    """ RefreshToken Model for storing refresh token related details """
    __tablename__ = "refresh_tokens"

    id = sa.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    user_id = sa.Column(sa.Integer, sa.ForeignKey('users.id'))
    user = relationship("User", back_populates="tokens")
    client_id = sa.Column(sa.Integer, sa.ForeignKey('clients.id'))
    client = relationship("Client", back_populates="tokens")
    issued_at = sa.Column(
        sa.DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    ip_address = sa.Column(IPAddressType)
    user_agent = sa.Column(sa.String(255), unique=False, nullable=True)
