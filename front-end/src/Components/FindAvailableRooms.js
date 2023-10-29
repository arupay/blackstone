import React, { useState} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function FindAvailableRooms() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [floor, setFloor] = useState('');
  const [capacity, setCapacity] = useState('');

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  console.log(startDate, endDate, floor, capacity)
  return (
    <div className="mt-3">
      <h4>Find available rooms:</h4>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Start:</Form.Label>
          <Col sm="6">
            <DatePicker 
              selected={startDate} 
              onChange={date => setStartDate(date)} 
              showTimeSelect
              filterTime={filterPassedTime}
              timeFormat="hh:mm aa"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">End:</Form.Label>
          <Col sm="6">
            <DatePicker 
              selected={endDate} 
              onChange={date => setEndDate(date)} 
              showTimeSelect
              filterTime={filterPassedTime}
              timeFormat="hh:mm aa"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Floor:</Form.Label>
          <Col sm="6">
            <Form.Control type="number" value={floor} onChange={e => setFloor(e.target.value)} />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row}>
          <Form.Label column sm="2">Capacity:</Form.Label>
          <Col sm="6">
            <Form.Control type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Find
        </Button>
      </Form>
    </div>
  );
}

export default FindAvailableRooms;
