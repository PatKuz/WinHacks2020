import * as React from "react";
import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const StyledFormGroup = styled(Form.Group)`
  background-color: #ffffff;
  border-radius: 2px;
  padding: 20px 20px;
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  color: #242424;
  display: inline-block;
`;

const StyledFormControl = styled(Form.Control)`
  background-color: #ffffff;
  position: relative;
  text-decoration: none;
  border: 0.5px solid light-blue;
  width: 400px;
  height: 75px;
  margin-left: 20px;
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  display: inline-block;
`;

const StyledButton = styled(Button)`
  margin-left: 88%;
  border: none;
  color: #242424;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  position: relative;
  transition-duration: 0.2s;
  background-color: #f2f3f4;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: 2px solid #f2f3f4;
  &:hover {
    background-color: #f2f3f4;
    color: #242424;
    border: 2px solid #242424;
  }
`;

class JoinRoom extends React.Component {
  state = {
    roomCode: "",
  };

  render() {
    const { roomCode } = this.state;

    return (
      <>
        <Form>
          <StyledFormGroup controlId="roomCode">
            Class Code:
            <StyledFormControl
              type="text"
              value={roomCode}
              onChange={(e) => this.setState({ roomCode: e.target.value })}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  this.props.setRoomCode(roomCode);
                }
              }}
            />
          </StyledFormGroup>
        </Form>

        <StyledButton onClick={() => this.props.setRoomCode(roomCode)}>
          Join Room
        </StyledButton>
      </>
    );
  }
}

export default JoinRoom;
