from flask import Flask
from flasgger import Swagger
from flask_cors import CORS, cross_origin
from app.auth.controller import auth

application = Flask(__name__)
cors = CORS(application, resources={r"/*": {"origins": "*", "supports_credentials": True}})
Swagger(application)

application.register_blueprint(auth, url_prefix='/auth')
