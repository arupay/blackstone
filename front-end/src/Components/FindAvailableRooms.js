import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertToUTCString } from "../utilities/formatDate";
import axios from "axios";
import { toast } from "react-toastify";
import "./FindAvailableRooms.scss";
import SpinnerComponent from "./SpinnerComponent";

const API = process.env.REACT_APP_API_URL;
function FindAvailableRooms({ setRooms, fetchRooms, allFloors }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState(1);

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
      toast.error("You  must choose a start and end time to search");
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
      const availableRoomsCount = response.data.payload.length;
      toast.success(
        `${availableRoomsCount} room(s) found to match your criteria!`
      );
      setRooms(response.data.payload);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // Optional: defines the transition animation
      });
      localStorage.setItem("startDate", convertToUTCString(startDate));
      localStorage.setItem("endDate", convertToUTCString(endDate));
    } catch (error) {
      toast.error("Error fetching available rooms:");
      console.error("Error fetching available rooms:", error);
    }
  };

  const clearForm = () => {
    setStartDate(null);
    setEndDate(null);
    setCapacity(1);
    setFloor("");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
    fetchRooms();
    toast.info("All fields cleared, rooms restored");
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
              <SpinnerComponent />
            )}
          </Form.Group>

          <Form.Group className="smallgroup mt-2">
            <Form.Label>Floor:</Form.Label>
            <Form.Control
              as="select"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            >
              <option value="">Any Floor</option>
              {allFloors.map((floorNumber) => (
                <option key={floorNumber} value={floorNumber}>
                  {floorNumber}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            className="smallgroup mt-2"
            style={{ marginRight: "50px" }}
          >
            <Form.Label>Room Capacity:</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                min="0"
                value={capacity}
                onChange={(e) =>
                  setCapacity(Math.max(0, parseInt(e.target.value, 10)))
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary mx-2"
                  type="button"
                  onClick={() =>
                    setCapacity((prevCapacity) => Math.max(0, prevCapacity - 1))
                  }
                >
                  -
                </button>
                <button
                  className="btn btn-outline-secondary mx-2"
                  type="button"
                  onClick={() =>
                    setCapacity((prevCapacity) => prevCapacity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center mx-auto">
          <button type="submit" className="submitroomfindbrf">
            Find
          </button>
          <button
            type="button"
            className="submitroomfindbrf"
            style={{ backgroundColor: "#fff" }}
            onClick={clearForm}
          >
            clear
          </button>
        </div>
      </Form>
    </div>
  );
}

export default FindAvailableRooms;
