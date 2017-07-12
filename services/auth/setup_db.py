import os
from sqlalchemy import create_engine, text
from sqlalchemy_utils import database_exists, create_database
from alembic.config import Config
from alembic import command
import pdb

dir_path = os.path.dirname(os.path.realpath(__file__))
alembic_cfg = Config(dir_path + "/alembic.ini")
def get_url():
    return (
        "postgresql://{db_user}:{db_pass}@{db_host}:"
        "{db_port}/{db_name}"
    ).format(
        db_user=os.getenv("DB_USER", "postgres"),
        db_pass=os.getenv("DB_PASSWORD", "password"),
        db_host=os.getenv("DB_HOST", "localhost"),
        db_port=os.getenv("DB_PORT", "5432"),
        db_name=os.getenv("DB_NAME", "auth"),
    )

url = get_url()
engine = create_engine(url)
if not database_exists(engine.url):
    create_database(engine.url)

with engine.begin() as connection:
    alembic_cfg.attributes['connection'] = connection
    command.upgrade(alembic_cfg, "head")

# with engine.begin() as connection:
#     users = ({"username": "vz", "email": "test1@test.com", "password": "123456", "created_at": "2017-06-30 08:43:18.7694", "updated_at": "2017-06-30 08:43:18.7694"},)
#     statement = text("""INSERT INTO users(username, email, password, created_at, updated_at) VALUES(:username, :email, :password, :created_at, :updated_at)""")
#     for user in users:
#         connection.execute(statement, **user)
#     result = connection.execute("select username from users")
#     for row in result:
#         print("username:", row['username'])
#
#
# with engine.begin() as connection:
#     clients = ({"cid": "webapp", "secret": "secret", "name": "web app", "application_type": 1, "active": True, "refresh_token_time": 14400, "allowed_origin": "*"},)
#     statement = text("""INSERT INTO clients(cid, secret, name, application_type, active, refresh_token_time, allowed_origin) VALUES(:cid, :secret, :name, :application_type, :active, :refresh_token_time, :allowed_origin)""")
#     for client in clients:
#         connection.execute(statement, **client)
#     result = connection.execute("select name from clients")
#     for row in result:
#         print("name:", row['name'])


# with engine.begin() as connection:
#     tokens = ({"id": "f6905f67-16af-40f2-a682-b788e24a3dc3","user_id": 1, "client_id": 1, "issued_at": "2017-06-30 08:43:18.7694"},)
#     statement = text("""INSERT INTO refresh_tokens(id, user_id, client_id, issued_at) VALUES(:id, :user_id, :client_id, :issued_at)""")
#     for token in tokens:
#         connection.execute(statement, **token)
#     result = connection.execute("select id from refresh_tokens")
#     for row in result:
#         print("id:", row['id'])
