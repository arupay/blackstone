import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleBookingDetails from "../Components/SingleBookingDetails";

const API = process.env.REACT_APP_API_URL;

function SingleBooking(props) {
  const [meetingDetails, setMeetingDetails] = useState();
  const { id } = useParams();
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
  return (
    <>
      {meetingDetails && (
        <SingleBookingDetails meetingDetails={meetingDetails} />
      )}
    </>
  );
}

export default SingleBooking;
