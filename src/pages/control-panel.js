import * as React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { compose } from "recompose";

import { withFirebase, withAuthorization, AuthUserContext } from "../api/";
import { Centered } from "../styles/global";
import TeacherRoom from "../components/TeacherRoom";
import ControlCard from "../components/ControlCard";
import Logo from "../components/Logo";
import SEO from "../components/SEO";

import Background from "../images/pattern_3.svg";

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
      })
      .then(() => {
        this.setRoomCode(sessionID);
      })
      .catch((err) => {
        console.log(err);
        this.setErrorMsg("Failed to create a session!");
      });
  };

  downloadData = () => {};

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
            />
          </StyledCentered>
        </>
      );
    else if (room === undefined || room === null)
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
            />
          </StyledCentered>
        </>
      );
    else
      return (
        <>
          <SEO title="Room" route="/" />
          <TeacherRoom room={room} />
        </>
      );
  }
}

export default compose(
  withAuthorization(isProfessor),
  withFirebase
)(ControlPage);
