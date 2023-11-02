import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertToUTCString } from "../utilities/formatDate";
import axios from "axios";
import "./FindAvailableRooms.scss";

const API = process.env.REACT_APP_API_URL;
function FindAvailableRooms({ setRooms }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const filterEndTime = (time) => {
    if (!filterPassedTime(time)) return false;

    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    const timeHours = time.getHours();
    const timeMinutes = time.getMinutes();

    return !(
      timeHours < startHours ||
      (timeHours === startHours && timeMinutes <= startMinutes)
    );
  };
  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    if (!startDate || !endDate) {
      alert("All fields must be filled!");
      return;
    }

    try {
      const requestBody = {
        start_date: convertToUTCString(startDate),
        end_date: convertToUTCString(endDate),
        floor: floor,
        capacity: capacity,
      };

      const response = await axios.get(`${API}/meeting-rooms/filter`, {
        params: requestBody,
      });
      setRooms(response.data.payload);
      localStorage.setItem("startDate", convertToUTCString(startDate));
      localStorage.setItem("endDate", convertToUTCString(endDate));
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  return (
    <div className="mt-3 formcontainer">
      <Form onSubmit={handleFilterSubmit} className="formcontainer__newform">
        <div className="largegroup">
          <Form.Group className=" smallgroup">
            <Form.Label>Start Date & Time:</Form.Label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              filterTime={filterPassedTime}
              timeFormat="hh:mm aa"
              timeIntervals={30}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              inline
            />
          </Form.Group>
          <Form.Group className="smallgroup">
            <Form.Label>End Date & Time:</Form.Label>
            {startDate ? (
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                filterTime={filterEndTime}
                timeFormat="hh:mm aa"
                timeIntervals={30}
                dateFormat="MM/dd/yyyy h:mm aa"
                className="form-control"
                inline
              />
            ) : (
              <div className="disabled-datepicker-placeholder">
                {/* <div className="spinner-text"> Select a start date & time</div> */}
              </div>
            )}
          </Form.Group>

          <Form.Group className="smallgroup mt-2">
            <Form.Label>Floor:</Form.Label>
            <Form.Control
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="smallgroup mt-2">
            <Form.Label>Room Capacity:</Form.Label>

            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center mx-auto">
          <button type="submit" className="submitroomfind">
            Find
          </button>
        </div>
      </Form>
    </div>
  );
}

export default FindAvailableRooms;
