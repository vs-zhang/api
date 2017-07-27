import uuid

def encode_refresh_token(token_uuid):
    return uuid.UUID(token_uuid).bytes.encode('base64').rstrip('=\n').replace('/', '_')

def decode_refresh_token(token):
    return uuid.UUID(bytes=(token + '==').replace('_','/').decode('base64'))
