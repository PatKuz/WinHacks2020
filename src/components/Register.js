import * as React from "react";
import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const StyledFormGroup = styled(Form.Group)`
  background-color: #ffffff;
  border-radius: 2px;
  padding: 20px 20px;
  font-family: "Overpass", sans-serif;
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
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  display: inline-block;
`;

const StyledFormControlz = styled(Form.Control)`
  background-color: #ffffff;
  position: relative;
  text-decoration: none;
  border: 0.5px solid light-blue;
  width: 400px;
  height: 75px;
  margin-left: 22px;
  font-family: "Overpass", sans-serif;
  font-size: 20px;
  display: inline-block;
`;

const StyledButton = styled(Button)`
  margin-left: 89%;
  border: none;
  color: #242424;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  position: relative;
  transition-duration: 0.2s;
  background-color: #f2f3f4;
  cursor: pointer;
  font-size: 15px;
  border-radius: 3px;
  border: 2px solid #f2f3f4;
  &:hover {
    background-color: #f2f3f4;
    color: #242424;
    border: 2px solid #242424;
  }
`;

const H5Div = styled.div`
  display: inline-block;
  margin-left: 20px;
  &.h5 {
    font-family: "Overpass", sans-serif;
    font-size: 20px;
  }
`;

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    institution: "",
  };

  render() {
    const { email, password, name, institution } = this.state;

    return (
      <>
        <Form>
          <H5Div>
            <h5>
              {" "}
              Administrative access to this beta product is availabe through a
              monthly subscription at a billed rate of $14.99/mo per
              administrative account. To request administrative access, please
              fill out the form below and our business team will be in contact
              through the provided email shortly.{" "}
            </h5>
          </H5Div>
          <StyledFormGroup controlId="emailField">
            <StyledFormControlz
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </StyledFormGroup>
          <StyledFormGroup controlId="passwordField">
            <StyledFormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </StyledFormGroup>
          <StyledFormGroup controlId="nameField">
            <StyledFormControl
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </StyledFormGroup>
          <StyledFormGroup controlId="nameField">
            <StyledFormControl
              type="text"
              placeholder="Institution"
              value={institution}
              onChange={(e) => this.setState({ institution: e.target.value })}
            />
          </StyledFormGroup>
        </Form>

        <StyledButton
          variant="primary"
          onClick={() =>
            this.props.attemptRegister(name, email, password, institution)
          }
        >
          Submit
        </StyledButton>
      </>
    );
  }
}

export default Register;
