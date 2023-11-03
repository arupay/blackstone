import BookRoomForm from "../Components/BookRoomForm";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MeetingRoomInfoBar from "../Components/MeetingRoomInfoBar";
import BookingInfoCardSmall from "../Components/BookingInfoCardSmall";

const API = process.env.REACT_APP_API_URL;

function SingleMeetingRoom(props) {
  const [meetings, setMeetings] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms/${id}/bookings`)
      .then((res) => {
        setMeetings(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${API}/meeting-rooms/${id}`)
      .then((res) => {
        setRoomInfo(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <span className="index-title reverse">
        <h1 className="index-title-text reverse">Book A Room</h1>
      </span>
      {/* <MeetingRoomInfoBar roomInfo={roomInfo} /> */}
      <Container className="mt-4">
        <BookRoomForm roomInfo={roomInfo} />
        <hr className="dark-line" />
        <h2 className="booklist-single">Upcoming Meetings</h2>

        {meetings.length
          ? meetings.map((meeting) => (
              <BookingInfoCardSmall key={meeting.id} meeting={meeting} />
            ))
          : "No future bookings found for this meeting room"}
      </Container>
    </div>
  );
}

export default SingleMeetingRoom;
