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
        <Row>
          <StyledHeader> Options </StyledHeader>
        </Row>
        <hr />
        <Row>
          <StyledButtonContainer>
            <StyledButton> Start Session </StyledButton>
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
