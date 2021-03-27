import * as React from "react"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Centered } from "../styles/global";

class Register extends React.Component {
	state = {
		email: "",
		password: "",
		name: "",
	}
	
	
	render() {
	  const {email, password, name} = this.state;
		
	  return (
		<Centered>
			<h1> Teacher </h1>
            <Form>
              <Form.Group controlId="nameField">
			  <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) =>
                    this.setState({ name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="emailField">
			  <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    this.setState({ email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="passwordField">
			  <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  value={password}
                  onChange={(e) =>
                    this.setState({ password: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              onClick={() =>
                this.props.attemptRegister(name, email, password)
              }
            >
              Register
            </Button>
		</Centered>
	  );
	}
};

export default Register;