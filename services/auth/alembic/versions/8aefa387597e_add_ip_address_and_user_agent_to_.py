"""add ip_address and user_agent to refresh token

Revision ID: 8aefa387597e
Revises: e03ab72efbb5
Create Date: 2017-07-22 17:44:57.331628

"""
from alembic import op
import sqlalchemy_utils
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '8aefa387597e'
down_revision = 'e03ab72efbb5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('refresh_tokens', sa.Column('ip_address', sqlalchemy_utils.types.ip_address.IPAddressType(length=50), nullable=True))
    op.add_column('refresh_tokens', sa.Column('user_agent', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('refresh_tokens', 'user_agent')
    op.drop_column('refresh_tokens', 'ip_address')
    # ### end Alembic commands ###
