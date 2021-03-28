import * as React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import randomize from "randomatic";

const StyledFormGroup = styled(Form.Group)`
  background-color: #ffffff;
  border-radius: 2px;
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  color: #242424;
  display: inline-block;
`;

const StyledFormControl = styled(Form.Control)`
  background-color: #ffffff;
  position: relative;
  text-decoration: none;
  border: 2px solid #5458ec;
  border-radius: 8px;
  width: 400px;
  height: 40px;
  margin-left: 20px;
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  display: inline-block;
`;

const StyledContainer = styled(Container)`
  background-color: #ffffff;
  margin-left: 25%;
  margin-right: 25%;
  border-radius: 5px;
  padding: 14px 16px;
  font-family: "Overpass", sans-serif;
  font-size: 15px;
  color: #242424
  height: 20%;
  overflow:scroll;
  border: 2px solid #242424;
`;

const StyledButton = styled(Button)`
  border: none;
  color: #242424;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.2s;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  border: 2px solid #ffffff;
  margin-right: 140px;
  margin-left: 140px;
  &:hover {
    background-color: #f2f3f4;
    color: #242424;
    border: 2px solid #242424;
  }
`;

const StyledButtonz = styled(Button)`
  border: none;
  color: #242424;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.2s;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  border: 2px solid #ffffff;
  &:hover {
    background-color: #f2f3f4;
    color: #242424;
    border: 2px solid #242424;
  }
`;

const StyledDivTwo = styled.div`
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  color: #242424;
  background-color: #e2e2e2;
  display: inline-block;
  padding: 10px 10px;
  width: 96%;
  border-radius: 10px;
  margin-top: 8px;
  text-align: left;
  height: 180px;
  border: 2px solid #242424;
  left: 0;
  right: 0;
  margin-left: 2%;
`;

const StyledHeader = styled.div`
  font-family: "Overpass", sans-serif;
  font-size: 25px;
  color: #242424;
  margin-left: 15px;
`;

const StyledButtonContainer = styled.div`
  display: inline-block;
  margin: auto;
`;

class ControlCard extends React.Component {
  state = {
    showHide: false,
    roomName: "",
    errorMsg: "",
  };

  handleSessionCreation = () => {
    const code = randomize("Aa0", 6);
    const { roomName } = this.state;

    if (roomName !== "") {
      this.handleModalShowHide();
      this.props.createSession(code, roomName);
    } else {
      this.setState({ errorMsg: "Rooms need a name!" });
    }
  };

  handleModalShowHide = () => {
    this.setState({
      showHide: !this.state.showHide,
      roomName: "",
      errorMsg: "",
    });
  };

  render() {
    let { showHide, roomName, errorMsg } = this.state;

    const PreviousSessions = () =>
      Object.keys(this.props.authUser.pastSessions).map((sessionID) => {
        const session = this.props.authUser.pastSessions[sessionID];

        return (
          <StyledDivTwo key={sessionID}>
            <div> Session Name: {session.name} </div>
            <div> Session Code: {session.code} [EXPIRED]</div>
            <hr />
            <StyledButtonz
              onClick={() => this.props.downloadData(session, sessionID)}
            >
              Download Session
            </StyledButtonz>
          </StyledDivTwo>
        );
      });

    return (
      <StyledContainer>
        <Modal
          show={showHide}
          onHide={() => this.handleModalShowHide()}
          centered
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Enter Room Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5> {errorMsg} </h5>
            <Form>
              <StyledFormGroup controlId="roomname">
                <StyledFormControl
                  onKeyPress={(e) => {
                    if (e.charCode === 13) {
                      this.handleSessionCreation();
                    }
                  }}
                  type="text"
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(e) => this.setState({ roomName: e.target.value })}
                />
              </StyledFormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Close
            </Button>
            <Button onClick={() => this.handleSessionCreation()}>
              Create Session
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          <StyledHeader> Options </StyledHeader>
        </Row>
        <hr />
        <Row>
          <StyledButtonContainer>
            <StyledButton onClick={() => this.handleModalShowHide()}>
              {" "}
              Start Session{" "}
            </StyledButton>
            <StyledButton onClick={() => this.props.attemptLogout()}>
              {" "}
              Logout{" "}
            </StyledButton>
          </StyledButtonContainer>
        </Row>
        <hr />
        <Row>
          <StyledHeader> Past Sessions </StyledHeader>
        </Row>
        <Row>
          <PreviousSessions />
        </Row>
      </StyledContainer>
    );
  }
}

export default ControlCard;
