import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function NewRoom(props) {
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const roomData = {
      name: roomName,
      floor: floor,
      capacity: capacity,
    };
    axios
      .post(`${API}/meeting-rooms`, roomData)
      .then((response) => {
        setRoomName("");
        setFloor("");
        setCapacity("");
      })
      .catch((error) => {
        console.log(error);
        // handle error, maybe show an error message to the user
      });
  };

  return (
    <div className="mt-3">
      <h5 className="mb-3">Create a Room</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Room Name:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              value={roomName}
              required
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Floor:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              value={floor}
              required
              onChange={(e) => setFloor(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Capacity:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr className="dark-line" />
    </div>
  );
}

export default NewRoom;
