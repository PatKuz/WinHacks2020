import * as React from "react";
import styled from "styled-components";

import Background from "../images/pattern_3.svg";
import { Button, Modal } from "react-bootstrap";

const StyledDiv = styled.div`
  background-color: #ffffff;
  border-left: 3px solid #292929;
  border-right: 3px solid #292929;
  width: 50%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  overflow: scroll;
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
  height: 140px;
  border: 2px solid #242424;
  left: 0;
  right: 0;
  margin-left: 2%;
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

const StyledButton = styled(Button)`
  background-color: #ff6961;
  display: inline-block;
  margin-left: 95%;
  margin-top: -46%;
  border-radius: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  position: fixed;
  border: 2px solid #ffffff;
  &:hover {
    background-color: #ffffff !important;
    color: #ff6961;
    border: 2px solid #ff6961;
  }
`;

const StyledLeave = styled(Button)`
  background-color: #ff6961;
  display: inline-block;
  margin-left: -90%;
  margin-top: -46%;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  text-decoration: none;
  border: 2px solid #ffffff;
  position: fixed;
  &:hover {
    background-color: #ffffff !important;
    color: #ff6961;
    border: 2px solid #ff6961;
  }
`;

const StyledQuestion = styled.div`
  font-size: 15px;
`;

const StyledParentVote = styled.div`
  margin-right: 3px;
`;

const StyledVote = styled(Button)`
  color: #242424;
  background-color: #ffffff;
  transition-duration: 0.2s;
  margin-left: 90%;
  cursor: pointer;
  text-decoration: none;
  border-radius: 18px;
  border: 2px solid #242424;
  padding: 2px 8px;
  margin-bottom: 10px;
  &:hover {
    background-color: #ff6961;
    color: #ffffff;
  }
`;

class TeacherRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      studentID: "",
      showHide: false,
    };
  }

  handleModalShowHide() {
    this.setState({
      showHide: !this.state.showHide,
    });
  }

  render() {
    const { showHide, errorMsg } = this.state;

    const OrderedList = Object.entries(this.props.room.questions).sort(
      (a, b) => {
        let amountOne = 0;
        Object.keys(a[1].upvotes).map((key) => amountOne++);
        let amountTwo = 0;
        Object.keys(b[1].upvotes).map((key) => amountTwo++);

        return amountTwo > amountOne ? 1 : -1;
      }
    );

    const Questions = () =>
      OrderedList.map((val) => {
        const question = val[1];

        let amount = 0;
        Object.keys(question.upvotes).map((key) => amount++);

        return (
          <StyledDivTwo key={val[0]} amount={amount}>
            <div>
              {" "}
              {question.title} | {amount} Upvote{amount !== 1 ? "s" : ""}{" "}
            </div>
            <hr />
            <StyledQuestion>
              {" "}
              {question.description}{" "}
              <StyledParentVote>
                <StyledVote onClick={() => this.props.deleteQuestion(val[0])}>
                  Remove
                </StyledVote>
              </StyledParentVote>
            </StyledQuestion>
          </StyledDivTwo>
        );
      });

    return (
      <BackgroundDiv>
        <StyledLeave onClick={() => this.props.closeRoom()}>
          End Session
        </StyledLeave>
        <StyledDiv>
          <h1> Room Code: {this.props.room.id} </h1>
          <Questions />
        </StyledDiv>
        <StyledButton onClick={() => this.handleModalShowHide()}>
          Statistic
        </StyledButton>
        <Modal
          show={showHide}
          onHide={() => this.handleModalShowHide()}
          centered
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Enter Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5> {errorMsg} </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </BackgroundDiv>
    );
  }
}

export default TeacherRoom;
