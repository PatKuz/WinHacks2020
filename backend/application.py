from flask import Flask
from Response import Response
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction
import json
from flask import jsonify
from uuid import UUID
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper
from flask_cors import CORS
import uuid
import random

with open('backend/creds.json') as (f):
                creds = json.load(f)

password = str(creds['PASS'])
Base = declarative_base()
engine = create_engine(
    'cockroachdb://winhacks21:' + password +  '@class-connect-8nw.gcp-us-east4.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=backend/certs/class-connect-ca.crt',
    echo=True                   # Log SQL queries to stdout
)

# Automatically create the "accounts" table based on the Account class.
Base.metadata.create_all(engine)

seen_account_ids = set()

app = Flask(__name__)

tables = {}

CORS(app)

def TableCreator(tablename):
    class Question(Base):
        """The Question class corresponds to the "qdata" database table.
        """
        __tablename__ = tablename
        id = Column(Integer, primary_key=True)
        title = Column(String)
        question = Column(String)
        votes = Column(Integer)
    return Question


@app.route('/')
def test():
    return "Hello"


@app.route('/droptable/<key>')
def droptable(key):
    results = run_transaction(sessionmaker(bind=engine), lambda s: drop(s, key))
    return Response("Yes", status=200)

def drop(session, key):
    session.execute('DROP TABLE ' + str(key))

@app.route('/createtable/<key>')
def createtable(key):
    results = run_transaction(sessionmaker(bind=engine), lambda s: create(s, key))
    return Response("Yes", status=200)

def create(session, key):
    session.execute('CREATE TABLE ' + str(key) + ''' (
            ID INTEGER PRIMARY KEY NOT NULL,
            TITLE STRING,
            QUESTION STRING,
            VOTES INT
            );''')



@app.route('/downloadSession/<uuid>')
def downloadStuff(uuid):

    uuid = 'a' + uuid.replace('-','').replace('\"','')
    
    table_name = uuid
    results = run_transaction(sessionmaker(bind=engine), lambda s: download(s, uuid))

    return Response({'Results' : (results)}, status=200)

def download(session, uuid):
    data = {'table_name' : uuid}
    # Base.__tablename__(uuid)
    if str(uuid) in tables:
        table = tables[str(uuid)]
    else:
        table = TableCreator(str(uuid))
        tables[str(uuid)] = table
    sources = session.query(table).all()
    ret = []
    for result in sources:
        ret.append({'id' : str(result.id), 'title':result.title, 'question' : result.question, 'votes' : result.votes})
    return ret

    

@app.route('/insertSession', methods=['POST'])
def insertSession():
    form = request.form

    roomid = form["id"]
    roomName = form["roomName"]
    uuid = form["uuid"]
    questions = form["questions"]

    uuid = 'a' + uuid.replace('-','').replace('\"','')
    table_name = uuid

    questions = json.loads(questions)


    addStuffTODB(roomid, roomName, uuid, questions)

    return "HELLO"


def addStuffTODB(roomId, roomName, uuid, questions):
    run_transaction(sessionmaker(bind=engine), lambda s: create(s, uuid))
    for question in questions:
        run_transaction(sessionmaker(bind=engine), lambda s: insert(s, uuid, question['title'], question['description'], question['votes']))



def insert(session, uuid, title, question, votes):
    x = random.randint(1,1000)

    sql = 'INSERT INTO ' + uuid + ' (ID,TITLE, QUESTION, VOTES) VALUES (:iu, :name, :ques, :vote)'
    session.execute(sql, {
        "iu":x,
        "name":title,
        "ques":question,
        "vote":votes
    })
