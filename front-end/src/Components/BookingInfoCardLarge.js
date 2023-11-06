import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { MdOutlineMeetingRoom, MdOutlineCreateNewFolder } from "react-icons/md";
import { PiElevatorFill } from "react-icons/pi";

import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import "./BookingInfoCardLarge.scss";
const API = process.env.REACT_APP_API_URL;

function BookingInfoCardLarge(props) {
  const { id } = props.booking;
  const [meetingDetails, setMeetingDetails] = useState();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [styledDate, setStyledDate] = useState({
    dayOfMonth: "",
    monthAbbreviation: "",
    weekdayAbrev: "",
  });
  const { showDeleteButton } = props;
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

  const handleDelete = () => {
    axios
      .delete(`${API}/bookings/${id}`)
      .then((res) => {
        toast.success("Booking deleted successfully.");
        if (props.onDelete) props.onDelete(id);
      })
      .catch((err) => {
        toast.error("Error deleting the booking.");
        console.error("Error deleting the booking:", err);
      });
  };

  const deleteBooking = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  return (
    meetingDetails && (
      <>
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
              <div style={{ textTransform: "none", fontSize: "13px" }}>
                <BsPerson size="1.1em" style={{ marginRight: "10px" }} />
                Created by: {meetingDetails.creator_email}
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
            {showDeleteButton && (
              <div
                onClick={deleteBooking}
                className="even-info"
                style={{ backgroundColor: "#B22222", color: "#ffff" }}
              >
                Cancel
              </div>
            )}
          </section>
        </article>
        <Modal show={showConfirmDialog} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this booking?</Modal.Body>
          <Modal.Footer>
            <button onClick={handleCancelDelete} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleConfirmDelete} className="btn btn-danger">
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
}

export default BookingInfoCardLarge;
