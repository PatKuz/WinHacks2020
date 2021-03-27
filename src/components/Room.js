import * as React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import Background from "../images/home-background.png";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactChipInput from "react-chip-input";

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

const StyledFormControlBody = styled(Form.Control)`
  background-color: #ffffff;
  position: relative;
  text-decoration: none;
  border: 2px solid #5458ec;
  border-radius: 8px;
  width: 400px;
  height: 100px;
  margin-left: 20px;
  font-family: "Overpass", sans-serif;
  font-size: 16px;
  display: inline-block;
`;

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

const StyledButton = styled(Button)`
  background-color: #ff6961;
  display: inline-block;
  margin-left: 95%;
  border-radius: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  &:hover {
    background-color: #ffffff !important;
    color: #ffffff;
  }
`;

const StyledLeave = styled(Button)`
  background-color: #ff6961;
  display: inline-block;
  margin-left: -85%;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    background-color: #ffffff !important;
    color: #ffffff;
  }
`;

class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      studentID: "",
      showHide: false,
      questionTitle: "",
      questionBody: "",
      chips: [],
    };
  }

  componentDidMount() {
    const { studentID } = this.state;

    let storedStudentID = localStorage.getItem("studentID");
    if (storedStudentID !== null && storedStudentID !== undefined) {
      this.setState({ studentID: storedStudentID });
    } else if (studentID === "") {
      const uid = uuidv4();
      this.setState({ studentID: uid });
      localStorage.setItem("studentID", uid);
    }
  }

  handleModalShowHide() {
    this.setState({
      showHide: !this.state.showHide,
      questionTitle: "",
      questionBody: "",
      chips: [],
    });
  }

  addChip = (value) => {
    const chips = this.state.chips.slice();
    chips.push(value);
    this.setState({ chips });
  };
  removeChip = (index) => {
    const chips = this.state.chips.slice();
    chips.splice(index, 1);
    this.setState({ chips });
  };

  submitQuestion = () => {
    const { questionTitle, questionBody, chips, studentID } = this.state;

    this.handleModalShowHide();
    this.setState({ questionTitle: "", questionBody: "", chips: [] });
    this.props.addQuestion(
      this.props.room.id,
      uuidv4(),
      {
        title: questionTitle,
        description: questionBody,
        tags: chips,
        upvotes: {},
      },
      studentID
    );
  };

  render() {
    const { showHide, questionTitle, questionBody, chips } = this.state;

    const Questions = () =>
      Object.keys(this.props.room.questions).map((key) => {
        return (
          <StyledDivTwo key={key}>
            <h1> {this.props.room.questions[key].title} </h1>
            <p> {this.props.room.questions[key].description} </p>
          </StyledDivTwo>
        );
      });

    return (
      <BackgroundDiv>
        <StyledLeave onClick={() => this.props.exitRoom()}>
          Leave Room
        </StyledLeave>
        <StyledDiv>
          <Questions />
        </StyledDiv>
        <StyledButton onClick={() => this.handleModalShowHide()}>
          +
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
            <Form>
              <StyledFormGroup controlId="question">
                <StyledFormControl
                  as="textarea"
                  placeholder="Question Title"
                  value={questionTitle}
                  onChange={(e) =>
                    this.setState({ questionTitle: e.target.value })
                  }
                />
              </StyledFormGroup>
              <StyledFormGroup controlId="question">
                <StyledFormControlBody
                  as="textarea"
                  placeholder="Question Body"
                  value={questionBody}
                  onChange={(e) =>
                    this.setState({ questionBody: e.target.value })
                  }
                />
              </StyledFormGroup>
            </Form>
            <ReactChipInput
              classes="class1 class2"
              chips={chips}
              onSubmit={(value) => this.addChip(value)}
              onRemove={(index) => this.removeChip(index)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Close
            </Button>
            <Button onClick={() => this.submitQuestion()}>Post Question</Button>
          </Modal.Footer>
        </Modal>
      </BackgroundDiv>
    );
  }
}

export default Room;
