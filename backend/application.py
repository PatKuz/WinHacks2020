from flask import Flask
from Response import Response
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction
import json


with open('backend/creds.json') as (f):
                creds = json.load(f)

password = str(creds['PASS'])
Base = declarative_base()
engine = create_engine(
    'cockroachdb://winhacks21:' + password +  '@class-connect-8nw.gcp-us-east4.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=backend\certs\class-connect-ca.crt',
    echo=True                   # Log SQL queries to stdout
)

# Automatically create the "accounts" table based on the Account class.
Base.metadata.create_all(engine)

seen_account_ids = set()

app = Flask(__name__)

class Question(Base):
    """The Account class corresponds to the "accounts" database table.
    """
    __tablename__ = 'qdata'
    id = Column(Integer, primary_key=True)
    question = Column(String)
    votes = Column(Integer)

class questio:
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


@app.route('/testtable')
def test():
    print(run_transaction(sessionmaker(bind=engine), testtable))
    return Response("Yes", status=200)


def testtable(session):
    sources = session.query(Question)
    for source in sources:
        print("Here")
        print(source.id)
        print(source.votes)
        print(source.question)
    return sources