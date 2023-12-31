import BookRoomForm from "../Components/BookRoomForm";
import { Container } from "react-bootstrap";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingInfoCardSmall from "../Components/BookingInfoCardSmall";

const API = process.env.REACT_APP_API_URL;

function SingleMeetingRoom(props) {
  const [meetings, setMeetings] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const { id } = useParams();

  const fetchBookings = useCallback(() => {
    axios
      .get(`${API}/meeting-rooms/${id}/bookings`)
      .then((res) => {
        setMeetings(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    fetchBookings();
    axios
      .get(`${API}/meeting-rooms/${id}`)
      .then((res) => {
        setRoomInfo(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, fetchBookings]);

  const mostRecentBookingId = useMemo(() => {
    return meetings.reduce((mostRecentId, currentMeeting) => {
      return !mostRecentId ||
        new Date(currentMeeting.created_on) >
          new Date(meetings.find((m) => m.id === mostRecentId).created_on)
        ? currentMeeting.id
        : mostRecentId;
    }, null);
  }, [meetings]);

  return (
    <div>
      <span className="index-title reverse">
        <h1 className="index-title-text reverse">Book A Room</h1>
      </span>
      {/* <MeetingRoomInfoBar roomInfo={roomInfo} /> */}
      <Container className="mt-4">
        <BookRoomForm roomInfo={roomInfo} fetchBookings={fetchBookings} />
        <hr className="dark-line" />
        <h2 className="booklist-single">Upcoming Meetings</h2>
        {meetings.length
          ? meetings.map((meeting) => (
              <BookingInfoCardSmall
                key={meeting.id}
                meeting={meeting}
                isMostRecent={meeting.id === mostRecentBookingId} //true or false are you the most recent
              />
            ))
          : "No future bookings found for this meeting room"}
      </Container>
    </div>
  );
}

export default SingleMeetingRoom;
