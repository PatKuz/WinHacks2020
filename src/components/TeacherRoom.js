import * as React from "react";
import styled from "styled-components";

import Background from "../images/home-background.png";
import { Button, Modal } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StyledDiv = styled.div`
  background-color: #ffffff;
  border-radius: 10px !important;
  border: 3px solid #292929;
  box-shadow: #636363 5px 1px 10px 5px;
  width: 70%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

const StyledDivTwo = styled.div`
  background-color: #ffffff;
  border-radius: 10px !important;
  border: 3px solid #292929;
  box-shadow: #636363 5px 1px 10px 5px;
  width: 75%;
`;

const BackgroundDiv = styled.div`
  background: url(${Background});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

class TeacherRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
    };
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  render() {
    const { showHide } = this.state;
    const percentage = 66;

    const Questions = () =>
      Object.keys(this.props.room.questions).map((key) => {
        console.log(this.props.room.questions[key]);
        return (
          <StyledDivTwo>
            <h1> {this.props.room.questions[key].title} </h1>
            <p> {this.props.room.questions[key].description} </p>
          </StyledDivTwo>
        );
      });

    return (
      <BackgroundDiv>
        <StyledDiv>
          <Questions />
        </StyledDiv>
        <Button onClick={() => this.handleModalShowHide()}>Show stats</Button>
        <Modal
          show={showHide}
          onHide={() => this.handleModalShowHide()}
          centered
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Stats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />;
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleModalShowHide()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </BackgroundDiv>
    );
  }
}

export default TeacherRoom;
