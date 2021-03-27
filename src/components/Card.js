import * as React from "react"
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Login from "../components/Login";
import Register from "../components/Register";

import { Centered } from "../styles/global";

const StyledContainer = styled(Container)`
	background-color: #ffffff;
	border-radius: 10px !important;
	border: 3px solid #292929;
	box-shadow: #636363 5px 1px 10px 5px;
`;



class Card extends React.Component {
  state = {
	render: "student",
	roomCode: "",
	email: "",
	password: "",
  }
  
  setRender = (render) => {
	if (render === "student" || render === "teacher" || render === "register")
		this.setState({render});
	else
		this.setState({render: "student"});
  }
	
  render() {
	const { render, roomCode, email, password } = this.state;
	
	const JoinRoom = () => {
	  return (
		<Centered>
			<h1> Student </h1>
            <Form>
              <Form.Group controlId="roomCode">
			  <Form.Label>Room Code</Form.Label>
                <Form.Control
                  type="text"
                  value={roomCode}
                  onChange={(e) =>
                    this.setState({ roomCode: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
			
            <Button
              variant="primary"
              onClick={() =>
                this.props.setRoomCode(roomCode)
              }
            >
              Save
            </Button>
		</Centered>
	  );
	};
	
	const RenderComponent = () => {
		if (render === "student")
			return (
				<JoinRoom />
			);
		else if (render === "register") {
			return (
				<Register attemptRegister={this.props.attemptRegister} />
			);
		}
		else
			return (
				<Login attemptLogin={this.props.attemptLogin} setRender={this.setRender}/>
			);
	}
	  
	return (
		<StyledContainer>
			<Row>
				<Button onClick={() => this.setRender("student")}> Student </Button>
				<Button onClick={() => this.setRender("teacher")}> Teacher </Button>
			</Row>
			<hr />
			<Row>
				<RenderComponent />
			</Row>
		</StyledContainer>
	);
  }
}

export default Card