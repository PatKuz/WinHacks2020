import * as React from "react";
import styled from "styled-components";

import Background from "../images/pattern_4.svg";
import { Button, Modal } from "react-bootstrap";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  margin-left: 90%;
  margin-top: -46%;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
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

const StyledConfused = styled.div`
  text-align: center;
  color: #242424;
  background-color: #ffffff;
  transition-duration: 0.2s;
  margin-right: -75%;
  cursor: pointer;
  text-decoration: none;
  border-radius: 18px;
  border: 2px solid #242424;
  padding: 50px 50px;
  font-size: 24px;
  &:hover {
  }
`;

const StyledH2 = styled.h2`
  margin-bottom: 20px;
`;

class TeacherRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      data: {
        sNumber: 0,
        uNumber: 0,
        qNumber: 0,
        tags: {},
      },
    };
  }

  handleModalShowHide() {
    this.setState({
      showHide: !this.state.showHide,
    });

    this.updateData();
  }

  updateData() {
    let { showHide } = this.state;
    const questions = this.props.room.questions;

    if (!showHide) {
      let qNumber = 0;
      Object.keys(questions).map((key) => qNumber++);

      let sNumber = 0;
      Object.keys(this.props.room.students).map((key) => sNumber++);

      let uNumber = 0;
      let tags = {};

      Object.entries(questions).map((val) => {
        Object.keys(val[1].upvotes).map((key) => uNumber++);
        val[1].tags.forEach((tag) => {
          if (tags.hasOwnProperty(tag)) {
            tags[tag]++;
          } else {
            tags[tag] = 0;
          }
          return null;
        });

        return null;
      });

      this.setState({
        data: {
          qNumber,
          sNumber,
          uNumber,
          tags,
        },
      });
    }
  }

  render() {
    const { showHide, errorMsg, data } = this.state;

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

    const TagData = () =>
      Object.entries(data.tags).map((val) => {
        return (
          <p>
            {" "}
            - {val[0]}: {val[1]}{" "}
          </p>
        );
      });

    let nConfused = 0;
    let nStudents = 0;
    Object.keys(this.props.room.students).map((val) => {
      nStudents++;
      if (this.props.room.students[val]) nConfused++;

      return null;
    });

    let percentage = nConfused / nStudents;

    return (
      <BackgroundDiv>
        <StyledLeave onClick={() => this.props.closeRoom()}>
          End Session
        </StyledLeave>
        <StyledConfused>
          <StyledH2> Students Confused </StyledH2>
          <CircularProgressbar
            value={nConfused}
            maxValue={nStudents}
            text={`${percentage * 100}%`}
          />
        </StyledConfused>
        <StyledDiv>
          <h1> Room Code: {this.props.room.id} </h1>
          <Questions />
        </StyledDiv>
        <StyledButton onClick={() => this.handleModalShowHide()}>
          Statistics
        </StyledButton>
        <Modal
          show={showHide}
          onHide={() => this.handleModalShowHide()}
          centered
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>Statistics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5> {errorMsg} </h5>

            <div>
              <p>
                {" "}
                <strong>Number of Active Questions:</strong> {data.qNumber}{" "}
              </p>
              <p>
                {" "}
                <strong>Number of Active Students:</strong> {data.sNumber}{" "}
              </p>
              <p>
                {" "}
                <strong>Number of Upvotes:</strong> {data.uNumber}{" "}
              </p>
              <p>
                {" "}
                <strong>Number of Each Tag Used:</strong>{" "}
              </p>
              <TagData />
            </div>
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
