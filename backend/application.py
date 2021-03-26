from flask import Flask
from keygen import generate
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/getCode')
def get_code():
    return generate()



