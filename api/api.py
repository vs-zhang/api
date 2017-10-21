from flask import Flask, request, jsonify
from flasgger import Swagger
from nameko.standalone.rpc import ClusterRpcProxy
import os
from utils import encode_refresh_token, decode_refresh_token
import pdb
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
Swagger(app)
RABBIT_USER = os.getenv("RABBIT_USER", "guest")
RABBIT_PASSWORD = os.getenv("RABBIT_PASSWORD", "guest")
RABBIT_HOST = os.getenv("RABBIT_HOST", "localhost")
RABBIT_PORT = os.getenv("RABBIT_PORT", 5672)
CONFIG = {'AMQP_URI': "amqp://{}:{}@{}:{}".format(RABBIT_USER, RABBIT_PASSWORD, RABBIT_HOST, RABBIT_PORT)}

@app.route('/oauth/token', methods=['POST'])
def oauth_token():
    print 'hi'
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    ecoded_cid = request.headers.get('Authorization').split(' ')[1]
    print request.cookies
    with ClusterRpcProxy(CONFIG) as rpc:
        client = rpc.client.get(ecoded_cid)
        grant_type = request.json.get('grant_type')
        result = {}
        if grant_type == 'password':
            print 'generating refresh_token and access_token by pwd'
            username = request.json.get('username')
            password = request.json.get('password')
            user = rpc.user.login(username, password)
            refresh_token = rpc.refresh_token.create(user['id'], client['id'], ip_address, user_agent)
            access_token = rpc.access_token.encode(user)
            result = {
                'token_type': 'bearer',
                'access_token': access_token,
                'refresh_token': encode_refresh_token(refresh_token['id'])
            }
        elif grant_type == 'refresh_token':
            print 'generating access_token by refresh_token'
            token = request.json.get('refresh_token')
            token_id = decode_refresh_token(token)
            refresh_token = rpc.refresh_token.get(token_id)
            user = rpc.user.get(refresh_token['user_id'])
            access_token = rpc.access_token.encode(user)
            result = {
                'token_type': 'bearer',
                'access_token': access_token,
                'refresh_token': token
            }
        else:
            print 'Wrong grant type'

        res = jsonify(result)
        res.set_cookie('my_key', 'my_value', domain=".dev.com")
        return res, 200


@app.route('/signup', methods=['POST'])
def signup():
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    ecoded_cid = request.headers.get('Authorization').split(' ')[1]
    with ClusterRpcProxy(CONFIG) as rpc:
        client = rpc.client.get(ecoded_cid)
        user = rpc.user.create(username, email, password)
        refresh_token = rpc.refresh_token.create(user['id'], client['id'], ip_address, user_agent)
        access_token = rpc.access_token.encode(user['id'])
        result = {
            'token_type': 'bearer',
            'access_token': access_token,
            'refresh_token': encode_refresh_token(refresh_token['id'])
        }
        return jsonify(result), 200
