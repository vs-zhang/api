import os
from flask import Flask
from flasgger import Swagger
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from auth.controller import auth

# load dotenv in the base root
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')   # refers to application_top
dotenv_path = os.path.join(APP_ROOT, '.env.local')
load_dotenv(dotenv_path)

application = Flask(__name__)
cors = CORS(application, resources={r"/*": {"origins": "*", "supports_credentials": True}})
Swagger(application)

application.register_blueprint(auth, url_prefix='/auth')
