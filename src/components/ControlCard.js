import * as React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const StyledContainer = styled(Container)`
  background-color: #ffffff;
  margin-left: 25%;
  margin-right: 25%;
  border-radius: 5px;
  padding: 14px 16px;
  font-family: "Overpass", sans-serif;
  font-size: 15px;
  color: #242424;
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

class ControlCard extends React.Component {
  state = {
    render: "student",
  };

  setRender = (render) => {
    if (render === "student" || render === "teacher" || render === "register")
      this.setState({ render });
    else this.setState({ render: "student" });
  };

  render() {
    const PreviousSessions = () =>
      Object.keys(this.props.authUser.pastSessions).map((sessionID) => {
        const session = this.props.authUser.pastSessions[sessionID];

        return (
          <StyledDivTwo key={sessionID}>
            <div> Session Name: {session.name} </div>
            <div> Session Code: {session.code} [EXPIRED]</div>
            <hr />
            <StyledButton
              onClick={() => this.props.downloadData(session, sessionID)}
            >
              Download Session
            </StyledButton>
          </StyledDivTwo>
        );
      });

    return (
      <StyledContainer>
        <Row>
          <h1> Options </h1>
        </Row>
        <hr />
        <Row>
          <StyledButton> Start Session </StyledButton>
          <StyledButton> Logout </StyledButton>
        </Row>
        <hr />
        <Row>
          <h1> Past Sessions </h1>
        </Row>
        <Row>
          <PreviousSessions />
        </Row>
      </StyledContainer>
    );
  }
}

export default ControlCard;
