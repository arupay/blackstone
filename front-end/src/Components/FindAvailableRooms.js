import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertToUTCString } from "../utilities/formatDate";
import axios from "axios";
import "./FindAvailableRooms.scss";
import search from "../assets/search.png"; // adjust the path and image name accordingly

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
  const handleFilterSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission

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
      <Form
        onSubmit={handleFilterSubmit}
        className="addtruckform formcontainer__newform"
      >
        <div className="largegroup">
          <Form.Group className="mb-2 smallgroup">
            <Form.Label>Start:</Form.Label>

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
          <Form.Group className="mb-2 smallgroup">
            <Form.Label>End:</Form.Label>
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
              <div className=" disabled-datepicker-placeholder">
                Select a start date & time
              </div>
            )}
          </Form.Group>

          <Form.Group className="smallgroup">
            <Form.Label>Floor:</Form.Label>
            <Form.Control
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="smallgroup">
            <Form.Label>Capacity:</Form.Label>

            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="text-center m-auto">
          <button type="submit" className="submitroomfind">
            Find
          </button>
        </div>
      </Form>
    </div>
  );
}

export default FindAvailableRooms;
