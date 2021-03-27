import * as React from "react"
import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Centered } from "../styles/global";

const StyledFormGroup = styled(Form.Group)`
  background-color: #ffffff;
  border-radius: 2px;
  padding: 20px 20px;
  font-family: 'Overpass', sans-serif;
  font-size: 20px;
  color: #242424;
  display: inline-block;
`;

const StyledFormControl = styled(Form.Control)`
  background-color: #ffffff;
  position: relative;
  text-decoration: none;
  border: 0.5px solid light-blue;
  width: 400px;
  height: 75px;
  margin-left: 20px;
  font-family: 'Overpass', sans-serif;
  font-size: 20px;
  display: inline-block;
`;

const StyledButton = styled(Button)`
  color: #242424;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.2s;
  background-color: #f2f3f4;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: 2px solid #f2f3f4;
  position: flex;
  margin-right: 4px;
  display: inline-block;
  &:hover {
    background-color: #f2f3f4;
    color: #242424;
    border: 2px solid #242424;
  };
`;

const StyledDiv = styled.div`
  margin-left: 81%;
`;

class Login extends React.Component {
	state = {
		email: "",
		password: "",
	}


	render() {
	  const {email, password} = this.state;
	  return (
		<>
            <Form>
              <StyledFormGroup controlId="email">
			    Email
                <StyledFormControl
                  type="email"
                  value={email}
                  onChange={(e) =>
                    this.setState({ email: e.target.value })
                  }
                />
              </StyledFormGroup>
              <StyledFormGroup controlId="password">
			    Password
                <StyledFormControl
                  type="text"
                  value={password}
                  onChange={(e) =>
                    this.setState({ password: e.target.value })
                  }
                />
              </StyledFormGroup>
            </Form>
            <StyledDiv>
              <StyledButton
                onClick={() =>
                  this.props.attemptLogin(email, password)
                }
              >
                Login
              </StyledButton>

			<StyledButton
              onClick={() =>
                this.props.setRender("register")
              }
            >
              Register
            </StyledButton>
          </StyledDiv>
		</>
	  );
	}
};

export default Login;
