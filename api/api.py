from flask import Flask
from flasgger import Swagger
from flask_cors import CORS, cross_origin
from auth.controller import auth

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})
Swagger(app)

app.register_blueprint(auth, url_prefix='/auth')
