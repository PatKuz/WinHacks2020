import * as React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { compose } from "recompose";

import { withFirebase, withAuthorization } from "../api/";
import { Centered } from "../styles/global";
import TeacherRoom from "../components/TeacherRoom";
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
  };
  unsubRooms = null;

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

  setRoomCode = (roomCode) => {
    this.setState({ roomCode });
  };

  attemptLogin = (login) => {
    this.props.firebase
      .doSignInWithEmail(login.email, login.password)
      .then(() => {
        navigate("/control-panel");
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { rooms, roomCode } = this.state;

    const room = rooms ? rooms.find((r) => r.id === roomCode) : null;

    if (roomCode === "")
      return (
        <>
          <SEO title="Home" route="/" />
          <StyledCentered>
            <Logo size="large" />
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
