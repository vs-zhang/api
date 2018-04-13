from flask import Blueprint, request, jsonify
from nameko.standalone.rpc import ClusterRpcProxy
from utils import encode_refresh_token, decode_refresh_token
from constants import CONFIG, DOMAIN

auth = Blueprint('auth', __name__)

@auth.route('/tokens', methods=['GET'])
def get_tokens():
    token = request.cookies.get('_rt')
    with ClusterRpcProxy(CONFIG) as rpc:
        token_id = decode_refresh_token(token)
        refresh_token = rpc.refresh_token.get(token_id)
        tokens = rpc.refresh_token.get_tokens(refresh_token['id'], refresh_token['user_id'])
        result = {
            'tokens': tokens
        }
        res = jsonify(result)
        return res, 200


@auth.route('/token', methods=['POST'])
def oauth_token():
    user_agent = request.headers.get('User-Agent')
    ip_address = request.remote_addr
    ecoded_cid = request.headers.get('Authorization').split(' ')[1]
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
            token = encode_refresh_token(refresh_token['id'])
            result = {
                'token_type': 'bearer',
                'access_token': access_token
            }
        elif grant_type == 'refresh_token':
            print 'generating access_token by refresh_token'
            token = request.cookies.get('_rt')
            token_id = decode_refresh_token(token)
            refresh_token = rpc.refresh_token.get(token_id)
            user = rpc.user.get(refresh_token['user_id'])
            access_token = rpc.access_token.encode(user)
            result = {
                'token_type': 'bearer',
                'access_token': access_token
            }
        else:
            print 'Wrong grant type'

        res = jsonify(result)
        print DOMAIN
        res.set_cookie('_rt', token, domain=DOMAIN, httponly=True, secure=True)
        return res, 200


@auth.route('/logout', methods=['POST'])
def logout():
    token = request.cookies.get('_rt')
    print token
    with ClusterRpcProxy(CONFIG) as rpc:
        token_id = decode_refresh_token(token)
        rpc.refresh_token.set_revoke(token_id)
        result = {
            'success': 'ok'
        }
        res = jsonify(result)
        print DOMAIN
        res.set_cookie('_rt', '', domain=DOMAIN, httponly=True, secure=True)
        return res, 200


@auth.route('/signup', methods=['POST'])
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
        access_token = rpc.access_token.encode(user)
        token = encode_refresh_token(refresh_token['id'])
        result = {
            'token_type': 'bearer',
            'access_token': access_token
        }
        res = jsonify(result)
        res.set_cookie('_rt', token, domain=DOMAIN, httponly=True, secure=True)
        return res, 200
