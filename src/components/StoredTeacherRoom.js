import * as React from "react";
import styled from "styled-components";

import Background from "../images/pattern_4.svg";
import { Button } from "react-bootstrap";

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

class TeacherRoom extends React.Component {
  render() {
    const OrderedList = Object.entries(this.props.room.questions).sort(
      (a, b) => {
        return b[1].upvotes > a[1].upvotes ? 1 : -1;
      }
    );

    const Questions = () =>
      OrderedList.map((val) => {
        const question = val[1];

        return (
          <StyledDivTwo key={val[0]}>
            <div>
              {" "}
              {question.title} | {question.upvotes} Upvote
              {question.upvotes !== 1 ? "s" : ""}{" "}
            </div>
            <hr />
            <StyledQuestion> {question.description} </StyledQuestion>
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
      </BackgroundDiv>
    );
  }
}

export default TeacherRoom;
