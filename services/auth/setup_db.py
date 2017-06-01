import os
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from alembic.config import Config
from alembic import command
dir_path = os.path.dirname(os.path.realpath(__file__))
alembic_cfg = Config(dir_path + "/alembic.ini")
print dir_path
def get_url():
    return (
        "postgresql://{db_user}:{db_pass}@{db_host}:"
        "{db_port}/{db_name}"
    ).format(
        db_user=os.getenv("DB_USER", "postgres"),
        db_pass=os.getenv("DB_PASSWORD", "password"),
        db_host=os.getenv("DB_HOST", "localhost"),
        db_port=os.getenv("DB_PORT", "5432"),
        db_name=os.getenv("DB_NAME", "users"),
    )

url = get_url()
engine = create_engine(url)
if not database_exists(engine.url):
    create_database(engine.url)

with engine.begin() as connection:
    alembic_cfg.attributes['connection'] = connection
    command.upgrade(alembic_cfg, "head")
