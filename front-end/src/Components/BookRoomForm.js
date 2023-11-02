import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function BookRoomForm() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [meetingName, setMeetingName] = useState("");
  const [attendees, setAttendees] = useState("");
  const { id } = useParams();

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterEndTime = (time) => {
    // Filter out times before the current time
    if (!filterPassedTime(time)) return false;

    // Get the hours and minutes for the selected start time
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    // Get the hours and minutes for the currently checked time
    const timeHours = time.getHours();
    const timeMinutes = time.getMinutes();

    // Check if the time is the same as the start time or before it
    return !(
      timeHours < startHours ||
      (timeHours === startHours && timeMinutes <= startMinutes)
    );
  };
  //retrieve date used for find booking page.
  useEffect(() => {
    const savedStartDate = localStorage.getItem("startDate");
    const savedEndDate = localStorage.getItem("endDate");
    if (savedStartDate) {
      const parsedStartDate = new Date(savedStartDate);
      if (!isNaN(parsedStartDate)) {
        setStartDate(parsedStartDate);
      }
    }
    if (savedEndDate) {
      const parsedEndDate = new Date(savedEndDate);
      if (!isNaN(parsedEndDate)) {
        setEndDate(parsedEndDate);
      }
    }
  }, []);

  const submitBookingRequest = (event) => {
    event.preventDefault();

    if (!meetingName || !attendees || !startDate || !endDate) {
      alert("All fields must be filled!");
      return;
    }

    const startUTC = startDate.toISOString();
    const endUTC = endDate.toISOString();

    if (startDate >= endDate) {
      alert("Start date must be before end date!");
      return;
    }

    const bookingData = {
      meeting_name: meetingName,
      start_date: startUTC,
      end_date: endUTC,
      attendees,
      meeting_room_id: id,
    };

    axios
      .post(`${API}/bookings`, bookingData)
      .then((response) => {
        console.log(response);
        alert("Booking successful!");
        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");
        window.location.reload();
      })
      .catch((error) => {
        alert("Booking failed!");
        console.error("Error submitting the booking:", error);
      });
  };

  return (
    <div className="mt-3">
      <h5>Book Room:</h5>
      <Form onSubmit={submitBookingRequest}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Meeting Name:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Start:
          </Form.Label>
          <Col sm="6">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              filterTime={filterPassedTime}
              timeFormat="hh:mm aa"
              timeIntervals={30}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            End:
          </Form.Label>
          <Col sm="6">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              filterTime={filterEndTime}
              timeFormat="hh:mm aa"
              timeIntervals={30}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              disabled={
                !startDate || startDate.getTime() === new Date().getTime()
              } //disabed until starttime is chosen
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Attendees:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BookRoomForm;
