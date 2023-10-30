import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SingleBookingDetails from "../Components/SingleBookingDetails";

const API = process.env.REACT_APP_API_URL;

function SingleBooking(props) {
  const [meetingDetails, setMeetingDetails] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/bookings/${id}`)
      .then((res) => {
        setMeetingDetails(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
    <>
      {meetingDetails && (
        <SingleBookingDetails
          meetingDetails={meetingDetails}
          onDelete={deleteBooking}
        />
      )}
    </>
  );
}

export default SingleBooking;
