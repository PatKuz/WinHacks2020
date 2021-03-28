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

table_name = ""

def getTableName():
    return table_name

def setTableName(name):
    table_name = name

CORS(app)

class Question(Base):
    """The Question class corresponds to the "qdata" database table.
    """
    with open('backend/table_name.json') as (f):
                creds = json.load(f)

    name = str(creds['table_name'])
    __tablename__ = name
    id = Column(Integer, primary_key=True)
    title = Column(String)
    question = Column(String)
    votes = Column(Integer)


@app.route('/', methods=['GET'])
def hello_world():
    return Response({'code' : 3}, status=200)

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
            ID INTEGER PRIMARY KEY NOT NULL,
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



@app.route('/downloadSession/<uuid>')
def downloadStuff(uuid):
    print("This is being downloaded") 
    print(uuid)
    uuid = 'a' + uuid.replace('-','').replace('\"','')
    
    data = {'table_name' : uuid}

    with open('backend/table_name.json', 'w') as (f):
                json.dump(data, f, ensure_ascii=False, indent=4)

   
    table_name = uuid

    
    results = run_transaction(sessionmaker(bind=engine), lambda s: download(s, uuid))
    print(results)
    return Response({'Results' : (results)}, status=200)

def download(session, uuid):
    # session.execute('SELECT * FROM abd239ec84740426ba99fe82568cf799d')
    # rows = session.fetchall()
    # session.commit()
    # for r in rows:
    #     print(r)
    print("Downloading")
    print(getTableName())
    sources = session.query(Question).all()
    print(sources)
    ret = []
    for result in sources:
        ret.append({'id' : str(result.id), 'title':result.title, 'question' : result.question, 'votes' : result.votes})
    return ret

    

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

    x = random.randint(1,1000)

    sql = 'INSERT INTO ' + uuid + ' (ID,TITLE, QUESTION, VOTES) VALUES (:iu, :name, :ques, :vote)'
    session.execute(sql, {
        "iu":x,
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
