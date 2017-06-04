from datetime import datetime
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
