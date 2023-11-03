import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsPeople, BsBuilding } from "react-icons/bs";
import "./BookRoomForm.scss";
const API = process.env.REACT_APP_API_URL;

function BookRoomForm(props) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [meetingName, setMeetingName] = useState("");
  const [attendees, setAttendees] = useState("");
  const { id } = useParams();
  const { name, floor, capacity } = props.roomInfo;
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

    if (!meetingName || !startDate || !endDate) {
      toast.error("Booking a meeting room requires all fields");
      return;
    }

    const startUTC = startDate.toISOString();
    const endUTC = endDate.toISOString();

    if (startDate >= endDate) {
      toast.error("End date cannot be before start date.");
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
        toast.success("Booking successful");
        props.fetchBookings();
        setStartDate(null);
        setEndDate(null);
        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");
      })
      .catch((error) => {
        toast.error("Booking failed");
        console.error("Error submitting the booking:", error);
      });
  };
  const clearForm = () => {
    setStartDate(null);
    setEndDate(null);
    setMeetingName("");
    setAttendees("");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
    toast.info("All fields cleared");
  };

  return (
    <div className="mt-3 formcontainerbrf">
      <Form
        onSubmit={submitBookingRequest}
        className="formcontainerbrf__newformbrf"
      >
        <div className="info">
          <h5>{name}</h5>
          <div>
            <BsBuilding size="2em" className="mx-2" />
            {floor}
          </div>
          <div>
            <BsPeople size="2em" className="mx-2" /> {capacity}
          </div>
        </div>
        <div className="largegroupbrf" style={{ paddingTop: "125px" }}>
          <Form.Group className=" smallgroupbrf">
            <Form.Label>Meeting Name:</Form.Label>
            <Form.Control
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className=" smallgroupbrf">
            <Form.Label>Attendee List:</Form.Label>
            <Form.Control
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </Form.Group>
          <Form.Group className=" smallgroupbrf">
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
          <Form.Group className="smallgroupbrf">
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
              <div className=" disabled-datepicker-placeholder">
                <div style={{ alignSelf: "flex-end" }}>
                  Select Start Time To Begin
                </div>
              </div>
            )}
          </Form.Group>
        </div>
        <div
          className="d-flex justify-content-end mx-auto"
          style={{ paddingRight: "50px" }}
        >
          <button
            type="button"
            className="submitroomfindbrf"
            style={{ backgroundColor: "#fff" }}
            onClick={clearForm}
          >
            clear
          </button>
          <button type="submit" className="submitroomfindbrf">
            Book
          </button>
        </div>
      </Form>
    </div>
  );
}

export default BookRoomForm;
