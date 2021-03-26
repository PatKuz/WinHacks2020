from flask import Flask
from keygen import generate
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/getCode')
def gen_key():
    import secrets
    return secrets.token_hex(3)
