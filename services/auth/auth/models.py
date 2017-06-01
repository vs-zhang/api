from datetime import datetime
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import PasswordType

class Base(object):
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

DeclarativeBase = declarative_base(cls=Base)

class User(DeclarativeBase):
    """ User Model for storing user related details """
    __tablename__ = "users"

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.String(255), unique=True)
    username = sa.Column(sa.String(255), unique=True)
    password = sa.Column(PasswordType(
        schemes=[
            'pbkdf2_sha512',
            'md5_crypt'
        ],
        deprecated=['md5_crypt']
    ))
