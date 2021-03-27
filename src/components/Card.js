import * as React from "react"
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Login from "../components/Login";
import Register from "../components/Register";
import JoinRoom from "../components/JoinRoom";

import { Centered } from "../styles/global";

const StyledContainer = styled(Container)`
  background-color: #ffffff;
  margin-left: 25%;
  margin-right: 25%;
  border-radius: 5px;
  padding: 14px 16px;
  font-family: 'Overpass', sans-serif;
  font-size: 15px;
  color: #242424;
`;

const StyledButton = styled(Button)`
  border: none;
  color: #242424;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.2s;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  &:hover: {
	background-color: #f2f3f4;
  };
`;



class Card extends React.Component {
  state = {
	render: "student",
  }
  
  setRender = (render) => {
	if (render === "student" || render === "teacher" || render === "register")
		this.setState({render});
	else
		this.setState({render: "student"});
  }
	
  render() {
	const { render } = this.state;
	
	const RenderComponent = () => {
		if (render === "student")
			return (
				<JoinRoom setRoomCode={this.props.setRoomCode}/>
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
				<StyledButton onClick={() => this.setRender("student")}> Student </StyledButton>
				<StyledButton onClick={() => this.setRender("teacher")}> Teacher </StyledButton>
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