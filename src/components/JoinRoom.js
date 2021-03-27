import * as React from "react"
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";


import { Centered } from "../styles/global";


class JoinRoom extends React.Component {
  state = {
	  roomCode: null,
  }
  
  
  render() {
  const { roomCode} = this.state
	  
	const onSubmit = async (event) => {
		event.preventDefault();
	}
	  
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
  }
}

export default JoinRoom