import * as React from "react"
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'

const StyledContainer = styled(Container)`
	background-color: #ffffff;
	border-radius: 10px !important;
	border: 3px solid #292929;
	box-shadow: #636363 5px 1px 10px 5px;
`;

const Room = () => {
  return (
	<StyledContainer>
		<h1> test </h1>
	</StyledContainer>
  );
}

export default Room