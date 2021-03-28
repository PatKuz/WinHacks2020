import * as React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { compose } from "recompose";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { withFirebase, withAuthorization, AuthUserContext } from "../api/";
import { Centered } from "../styles/global";
import TeacherRoom from "../components/TeacherRoom";
import ControlCard from "../components/ControlCard";
import Logo from "../components/Logo";
import SEO from "../components/SEO";

import Background from "../images/pattern_4.svg";

const StyledCentered = styled(Centered)`
  background: url(${Background});
`;

const isProfessor = (authUser) => !!authUser?.roles?.professor;

class ControlPage extends React.Component {
  _initFirebase = false;
  state = {
    roomCode: "",
    rooms: null,
    errorMsg: "",
  };
  unsubRooms = null;
  static contextType = AuthUserContext;

  componentDidMount() {
    if (this.props.firebase && !this._initFirebase) this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.firebase && !this._initFirebase) this.loadData();
  }

  componentWillUnmount() {
    if (typeof this.unsubRooms === "function") this.unsubRooms();
  }

  loadData = async () => {
    this._initFirebase = true;

    let storedRoomCode = localStorage.getItem("roomCode");
    if (storedRoomCode !== null && storedRoomCode !== undefined)
      this.setState({ roomCode: storedRoomCode });

    // eslint-disable-next-line
    const rooms = await new Promise((resolve, reject) => {
      let resolveOnce = (doc) => {
        resolveOnce = () => null;
        resolve(doc);
      };

      this.unsubRooms = this.props.firebase
        .rooms()
        .onSnapshot((querySnapshot) => {
          const rooms = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          this.setState({ rooms });
          resolveOnce(rooms);
        }, reject);
    });
  };

  setErrorMsg = (errorMsg) => {
    this.setState({ errorMsg: errorMsg });
    this.forceUpdate();
  };

  setRoomCode = (roomCode) => {
    this.setErrorMsg("");

    localStorage.setItem("roomCode", roomCode);

    this.setState({ roomCode });
  };

  attemptLogout = () => {
    this.props.firebase
      .doSignOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        this.setErrorMsg("Logout failed!");
      });
  };

  createSession = (sessionID, sessionName) => {
    this.props.firebase
      .room(sessionID)
      .set({
        professor: this.context.uid,
        questions: {},
        roomName: sessionName,
        students: {},
      })
      .then(() => {
        this.setRoomCode(sessionID);
      })
      .catch((err) => {
        console.log(err);
        this.setErrorMsg("Failed to create a session!");
      });
  };

  downloadData = (room) => {
    console.log(room);
  };

  saveData = (room, roomUUID) => {
    console.log(room);

    var id = room.id;
    var questions = room.questions;
    var roomName = room.roomName;

    var parsedQuestions = [];

    console.log("Printing questions");
    for (var key in questions) {
      console.log(questions[key]);
      var question = {
        title: questions[key]["description"],
        description: questions[key]["description"],
        votes: "3",
      };
      console.log("I'm printing quesiton");
      console.log(question);
      parsedQuestions.push(question);
    }

    console.log("Printing out stuff");
    console.log(parsedQuestions);
    console.log(id);
    console.log(roomName);
    console.log(roomUUID);

    console.log("Stringified Questions");
    parsedQuestions = JSON.stringify(parsedQuestions);
    console.log(parsedQuestions);

    var bodyFormData = new FormData();
    bodyFormData.append("id", id);
    bodyFormData.append("questions", parsedQuestions);
    bodyFormData.append("roomName", roomName);
    bodyFormData.append("uuid", JSON.stringify(roomUUID));

    axios({
      method: "post",
      url: "http://127.0.0.1:4000/insertSession",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  deleteQuestion = (questionID) => {
    let { roomCode, rooms } = this.state;
    const room = rooms ? rooms.find((r) => r.id === roomCode) : null;

    delete room.questions[questionID];

    this.props.firebase
      .room(roomCode)
      .set(room)
      .catch((err) => console.log(err));
  };

  clearSessions = () => {
    this.props.firebase
      .user(this.context.uid)
      .set({
        email: this.context.email,
        name: this.context.name,
        pastSessions: {},
        roles: this.context.roles,
      })
      .catch((err) => {
        console.log(err);
        this.setErrorMsg("Unable to save your data!");
      });

    this.context.pastSessions = {};
  };

  closeRoom = () => {
    let { roomCode, rooms } = this.state;
    const room = rooms ? rooms.find((r) => r.id === roomCode) : null;

    const updatedUser = this.context;
    const uid = uuidv4();
    updatedUser.pastSessions[uid] = {
      code: roomCode,
      name: room.roomName,
    };

    this.saveData(room, uid);

    this.props.firebase
      .user(this.context.uid)
      .set({
        email: updatedUser.email,
        name: updatedUser.name,
        pastSessions: updatedUser.pastSessions,
        roles: updatedUser.roles,
      })
      .catch((err) => {
        console.log(err);
        this.setErrorMsg("Unable to save your data!");
      });

    this.props.firebase
      .room(roomCode)
      .delete(() => {
        this.setRoomCode("");
      })
      .catch((err) => {
        this.setErrorMsg("Room Close Failing!");
        console.log(err);
      });
  };

  render() {
    let { errorMsg, rooms, roomCode } = this.state;

    const room = rooms ? rooms.find((r) => r.id === roomCode) : null;

    if (errorMsg !== "")
      return (
        <>
          <SEO title="Home" route="/" />
          <StyledCentered>
            <Logo size="large" />
            <h1> {errorMsg} </h1>
            <ControlCard
              authUser={this.context}
              downloadData={this.downloadData}
              attemptLogout={this.attemptLogout}
              createSession={this.createSession}
              clearSessions={this.clearSessions}
            />
          </StyledCentered>
        </>
      );
    else if (roomCode === "")
      return (
        <>
          <SEO title="Home" route="/" />
          <StyledCentered>
            <Logo size="large" />
            <ControlCard
              authUser={this.context}
              downloadData={this.downloadData}
              attemptLogout={this.attemptLogout}
              createSession={this.createSession}
              clearSessions={this.clearSessions}
            />
          </StyledCentered>
        </>
      );
    else if (room === undefined || room === null) {
      return (
        <>
          <SEO title="Home" route="/" />
          <StyledCentered>
            <Logo size="large" />
            <h1> Room not found! </h1>
            <ControlCard
              authUser={this.context}
              downloadData={this.downloadData}
              attemptLogout={this.attemptLogout}
              createSession={this.createSession}
              clearSessions={this.clearSessions}
            />
          </StyledCentered>
        </>
      );
    } else
      return (
        <>
          <SEO title="Room" route="/" />
          <TeacherRoom
            room={room}
            deleteQuestion={this.deleteQuestion}
            closeRoom={this.closeRoom}
          />
        </>
      );
  }
}

export default compose(
  withAuthorization(isProfessor),
  withFirebase
)(ControlPage);
