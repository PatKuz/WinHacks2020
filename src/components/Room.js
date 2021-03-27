import * as React from "react"
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Background from "../images/home-background.png";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button,Modal } from 'react-bootstrap'

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

const StyledTitle = styled.h1`
	padding-bottom: 10px;
	font-size: 100px;
	color: orange;
	-webkit-text-stroke: 3px black;
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
	};
`;


class Room extends React.Component {
	constructor(){
        super();
        this.state = {
            showHide : false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }


	render() {
		const { showHide } = this.state;

		const Questions = () => Object.keys(this.props.room.questions).map((key) => {
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
				<StyledButton onClick={() => this.handleModalShowHide()}>
                    +
                </StyledButton>
				<Modal show={showHide} onHide={() => this.handleModalShowHide()} centered>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Enter Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>FORM</Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button onClick={() => this.handleModalShowHide()}>
                        Post Question
                    </Button>
                    </Modal.Footer>
                </Modal>
			</BackgroundDiv>
		);
	}
}

export default Room
