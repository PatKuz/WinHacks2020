import * as React from "react"
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import JoinRoom from './JoinRoom';

const StyledContainer = styled(Container)`
	background-color: #ffffff;
	border-radius: 10px !important;
	border: 3px solid #292929;
	box-shadow: #636363 5px 1px 10px 5px;
`;

const Card = ({ setRoomCode }) => {
  return (
	<StyledContainer>
		<Row>
			<Col>
				<JoinRoom setRoomCode={setRoomCode} />
			</Col>
			<Col>
				<h1> LOGIN </h1>
			</Col>
		</Row>
	</StyledContainer>
  );
}

export default Card