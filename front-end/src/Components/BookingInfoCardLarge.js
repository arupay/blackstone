import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { MdOutlineMeetingRoom, MdOutlineCreateNewFolder } from "react-icons/md";
import { PiElevatorFill } from "react-icons/pi";

import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookingInfoCardLarge.scss";
const API = process.env.REACT_APP_API_URL;

function BookingInfoCardLarge(props) {
  const { id } = props.booking;
  const [meetingDetails, setMeetingDetails] = useState();
  const [styledDate, setStyledDate] = useState({
    dayOfMonth: "",
    monthAbbreviation: "",
    weekdayAbrev: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/bookings/${id}`)
      .then((res) => {
        const fetchedMeetingDetails = res.data.payload; // Assuming the API response structure
        setMeetingDetails(fetchedMeetingDetails);
        const dayOfMonth = getDayOfMonth(fetchedMeetingDetails.start_date);
        const monthAbbreviation = getMonthAbbreviation(
          fetchedMeetingDetails.start_date
        );
        const weekdayAbrev = getDayOfWeekAbbreviation(
          fetchedMeetingDetails.start_date
        );

        setStyledDate({ dayOfMonth, monthAbbreviation, weekdayAbrev });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(meetingDetails);

  const deleteBooking = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`${API}/bookings/${id}`)
        .then((res) => {
          console.log("Booking deleted successfully.");
          navigate(`/`);
        })
        .catch((err) => {
          console.log("Error deleting the booking:", err);
        });
    }
  };

  return (
    meetingDetails && (
      <article className="large-bkcard fl-left">
        <section className="large-bkdate">
          <time>
            <span className="large-bkdate-weekday">
              {styledDate.weekdayAbrev}
            </span>
            <span className="large-bkdate-day">{styledDate.dayOfMonth}</span>
            <span className="large-bkdate-month">
              {styledDate.monthAbbreviation}
            </span>
          </time>
        </section>
        <section className="large-bkcard-cont">
          <h3>{meetingDetails.meeting_name}</h3>
          <div style={{ marginBottom: "20px" }}>
            <MdOutlineMeetingRoom size="1.5em" />
            {meetingDetails.room_name} <PiElevatorFill size="1.5em" />
            {meetingDetails.floor}
          </div>

          <div className="large-even-date">
            <div style={{ textTransform: "none", fontSize: "13px" }}>
              <TbClockPlay size="1.1em" style={{ marginRight: "10px" }} />
              Begins: {formatDate(meetingDetails.start_date).slice(0, -4)}
            </div>
            <div style={{ textTransform: "none", fontSize: "13px" }}>
              <TbClockStop size="1.1em" style={{ marginRight: "10px" }} />
              Ends: {formatDate(meetingDetails.end_date).slice(0, -4)}
            </div>{" "}
            <div style={{ textTransform: "none", fontSize: "13px" }}>
              <MdOutlineCreateNewFolder
                size="1.1em"
                style={{ marginRight: "10px" }}
              />
              Created On: {formatDate(meetingDetails.created_on).slice(0, -4)}
            </div>
          </div>
        </section>
        <section className="large-bkcard-final">
          <h5>Attendees:</h5>
          {meetingDetails.attendees.map((attendee) => {
            return (
              <div className="text-muted small" key={attendee}>
                {attendee}
              </div>
            );
          })}
        </section>
      </article>
    )
  );
}

export default BookingInfoCardLarge;

/** <div className="mt-3">
      <div
        className="card mb-2 room-card"
        onClick={() => navigate(`/bookings/${booking.id}`)}
      >
        <div className="card-body">
          <h4 className="card-title mb-3">{booking.meeting_name} </h4>
          <h6 className=" mb-2">{booking.name} </h6>
          <div className="d-flex align-items-center mb-2">
            <TbClockPlay size="2em" />
            <span className="mx-2">
              Start Time: {formatDate(booking.start_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <TbClockStop size="2em" />
            <span className="mx-2">
              End Time: {formatDate(booking.end_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <BsBuilding size="2em" />
            <span className="mx-2">Floor: {booking.floor}</span>
          </div>
        </div>
      </div>
    </div> */
