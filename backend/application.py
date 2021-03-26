from flask import Flask
from Response import Response
app = Flask(__name__)

class question:
    def __init__(self):
        self.UPVOTES = 0

    def addVote(self):
        self.UPVOTES += 1

    def undoVote(self):
        self.UPVOTES -= 1

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/getCode')
def gen_key():
    import secrets
    return Response({'code' : secrets.token_hex(3)}, status=200)