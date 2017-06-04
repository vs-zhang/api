from flask import Flask, request, jsonify
from flasgger import Swagger
from nameko.standalone.rpc import ClusterRpcProxy
import os

app = Flask(__name__)
Swagger(app)
RABBIT_USER = os.getenv("RABBIT_USER", "guest")
RABBIT_PASSWORD = os.getenv("RABBIT_PASSWORD", "guest")
RABBIT_HOST = os.getenv("RABBIT_HOST", "localhost")
RABBIT_PORT = os.getenv("RABBIT_PORT", 5673)
CONFIG = {'AMQP_URI': "amqp://{}:{}@{}:{}".format(RABBIT_USER, RABBIT_PASSWORD, RABBIT_HOST, RABBIT_PORT)}

@app.route('/user', methods=['POST'])
def user():
    username = request.json.get('username')
    with ClusterRpcProxy(CONFIG) as rpc:
        result = rpc.auth.create_user(username)
        return jsonify(result), 200
