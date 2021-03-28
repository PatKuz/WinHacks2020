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

table_name = ""

CORS(app)

class Question(Base):
    """The Question class corresponds to the "qdata" database table.
    """
    __tablename__ = table_name
    id = Column(Integer, primary_key=True)
    title = Column(String)
    question = Column(String)
    votes = Column(Integer)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

@app.route('/getCode', methods=['GET'])
def gen_key():
    import secrets
    return Response({'code' : secrets.token_hex(3)}, status=200)


@app.route('/testtable')
def test():
    print(run_transaction(sessionmaker(bind=engine), testtable))
    return Response("Yes", status=200)


def getQDB(session):
    sources = session.query(Question)
    return sources


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
            ID UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
            TITLE STRING,
            QUESTION STRING,
            VOTES INT
            );''')

@app.route('/testinsert')
def testinsert():
    run_transaction(sessionmaker(bind=engine),
                lambda s: createQuestion(s, "Test5"))
    return Response("Yes", status=200)

def createQuestion(session, content):
    question = Question(
        question = content,
        votes = 1
    )
    session.add(question)

@app.route('/getQuestions')
def getQuestions():
    results = run_transaction(sessionmaker(bind=engine), getQDB)
    ret = []
    for result in results:
        ret.append({'id' : str(result.id), 'question' : result.question, 'votes' : result.votes})

    ret.sort(key=lambda s: s['votes'], reverse=True)

    return Response({'questions' : ret}, status=200)



def upvote(session, questionid):
    session.query(Question).filter_by(id=questionid).update(
        {"votes": (Question.votes + 1)}
    )

def removeVote(session, questionid):
    session.query(Question).filter_by(id=questionid).update(
        {"votes": (Question.votes - 1)}
    )

@app.route('/updateVotes/<questionid>')
def updateVote(questionid):
    print("This is called")
    results = run_transaction(sessionmaker(bind=engine), lambda s: upvote(s, questionid))
    return Response("Yes", status=200)


@app.route('/insertSession', methods=['POST'])
def insertSession():
    print("Here")
    print(request)
    form = request.form
    print(form)

    roomid = form["id"]
    roomName = form["roomName"]
    uuid = form["uuid"]
    questions = form["questions"]

    uuid = 'a' + uuid.replace('-','').replace('\"','')
    table_name = uuid
    print("uuid")
    print(uuid)

    print(questions)
    questions = json.loads(questions)
    print(questions)

    addStuffTODB(roomid, roomName, uuid, questions)

    return "HELLO"


def addStuffTODB(roomId, roomName, uuid, questions):
    print("Making table")
    run_transaction(sessionmaker(bind=engine), lambda s: create(s, uuid))
    print("printing questions")
    for question in questions:
        run_transaction(sessionmaker(bind=engine), lambda s: insert(s, uuid, question['title'], question['description'], question['votes']))
        print("HERE WE ARE")
        # print(question)




def insert(session, uuid, title, question, votes):
    print(uuid)

    sql = 'INSERT INTO ' + uuid + ' (TITLE, QUESTION, VOTES) VALUES (:name, :ques, :vote)'
    session.execute(sql, {
        "name":title,
        "ques":question,
        "vote":votes
    })
    # question = Question(
    #     id=3,
    #     title = title,
    #     question = question,
    #     votes = votes
    # )
    # session.add(question)
