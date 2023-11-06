import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsPeople, BsBuilding } from "react-icons/bs";
import "./BookRoomForm.scss";
import SpinnerComponent from "./SpinnerComponent";
const API = process.env.REACT_APP_API_URL;

function BookRoomForm(props) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [meetingName, setMeetingName] = useState("");
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendeesList, setAttendeesList] = useState([]);
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const addAttendee = () => {
    if (emailRegex.test(attendeeInput)) {
      if (!attendeesList.includes(attendeeInput)) {
        setAttendeesList([...attendeesList, attendeeInput]);
        setAttendeeInput("");
      } else {
        toast.error("Attendee already added.");
      }
    } else {
      toast.error("Please enter a valid email address.");
    }
  };
  const removeAttendee = (email) => {
    setAttendeesList(attendeesList.filter((attendee) => attendee !== email));
  };

  const submitBookingRequest = (event) => {
    event.preventDefault();

    if (!meetingName || !startDate || !endDate) {
      toast.error("Booking a meeting room requires all fields");
      return;
    }

    // Retrieve userInfo from localStorage and parse it
    const storedUserInfo = localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      toast.error("User information is not available. Please log in again.");
      return;
    }

    const { userId } = JSON.parse(storedUserInfo);
    if (!userId) {
      toast.error("User ID is not available. Please log in again.");
      return;
    }

    const startUTC = startDate.toISOString();
    const endUTC = endDate.toISOString();
    const attendeesString = attendeesList.join(";");

    // Include the userId in the bookingData
    const bookingData = {
      meeting_name: meetingName,
      start_date: startUTC,
      end_date: endUTC,
      attendees: attendeesString,
      meeting_room_id: id,
      created_by: userId, // Adding the userId from localStorage
    };

    axios
      .post(`${API}/bookings`, bookingData)
      .then((response) => {
        toast.success("Booking successful");
        props.fetchBookings();
        clearForm();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth", // Optional: defines the transition animation
        });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          // If the error doesn't have a response with a message, default to a general error message
          toast.error("Booking failed with an unexpected error");
        }
        console.error("Error submitting the booking:", error);
      });
  };
  const clearForm = () => {
    setStartDate(null);
    setEndDate(null);
    setMeetingName("");
    setAttendeeInput("");
    setAttendeesList([]);
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
              <SpinnerComponent />
            )}
          </Form.Group>
          <div className=" smallgroupbrf mt-2">
            <Form.Group>
              <Form.Label>Meeting Name:</Form.Label>

              <Form.Control
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Attendee List (email):</Form.Label>
              <div className="input-group " style={{ maxWidth: "330px" }}>
                <Form.Control
                  type="text"
                  placeholder="Enter attendee email"
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAttendee()}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    style={{ marginLeft: "25px", borderRadius: "100%" }}
                    type="button"
                    onClick={addAttendee}
                  >
                    +
                  </button>
                </div>
              </div>
            </Form.Group>
            <div className="d-flex flex-column">
              {attendeesList.map((email, index) => (
                <span
                  key={index}
                  className="d-inline-block my-1 text-muted small mr-3 bounce-enter"
                >
                  <span type="button" onClick={() => removeAttendee(email)}>
                    🗑️
                  </span>{" "}
                  {email}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center mx-auto"
          style={{ paddingLeft: "50px" }}
        >
          <button type="submit" className="submitroomfindbrf">
            Book
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

export default BookRoomForm;
