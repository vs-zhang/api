"""baseline

Revision ID: 20675fe49cf6
Revises: 
Create Date: 2017-06-01 04:55:36.072481

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy_utils import PasswordType


# revision identifiers, used by Alembic.
revision = '20675fe49cf6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String(255), unique=True),
        sa.Column('username', sa.String(255), unique=True),
        sa.Column('password', PasswordType(
            schemes=[
                'pbkdf2_sha512',
                'md5_crypt'
            ],
            deprecated=['md5_crypt']
        )),
    )


def downgrade():
    op.drop_table('users')
