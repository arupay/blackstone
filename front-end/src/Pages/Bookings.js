import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tab, Tabs } from "react-bootstrap";
import BookingInfoCardLarge from "../Components/BookingInfoCardLarge";
import "./Bookings.scss";

const API = process.env.REACT_APP_API_URL;

function Bookings(props) {
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);
  const [myPastBookings, setMyPastBookings] = useState([]);
  const [myFutureBookings, setMyFutureBookings] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email; // Retrieve user email from localStorage

  useEffect(() => {
    axios
      .get(`${API}/bookings/`)
      .then((res) => {
        setPastBookings(res.data.payload.past);
        setFutureBookings(res.data.payload.future);
        const past = res.data.payload.past.filter((booking) =>
          booking.attendees.includes(userEmail)
        );
        setMyPastBookings(past);
        const future = res.data.payload.future.filter((booking) =>
          booking.attendees.includes(userEmail)
        );
        setMyFutureBookings(future);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleBookingDelete = (deletedBookingId) => {
    setMyFutureBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== deletedBookingId)
    );
  };

  return (
    <>
      <span className="index-title reverse"></span>{" "}
      <Container>
        <Tabs
          defaultActiveKey="myfuture"
          id="bookings-tab"
          className="mb-3 custom-tab"
        >
          <Tab eventKey="myfuture" title="My Upcoming Meetings">
            <Container className="d-flex flex-column justify-content-center align-items-center">
              {myFutureBookings.length > 0 ? (
                myFutureBookings.map((booking) => (
                  <BookingInfoCardLarge
                    key={booking.id}
                    booking={booking}
                    showDeleteButton={true}
                    onDelete={handleBookingDelete}
                  />
                ))
              ) : (
                <p>No future bookings</p>
              )}
            </Container>
          </Tab>
          <Tab eventKey="mypast" title="My Past Meetings">
            <Container className="d-flex flex-column justify-content-center align-items-center">
              {myPastBookings.length > 0 ? (
                myPastBookings.map((booking) => (
                  <BookingInfoCardLarge booking={booking} key={booking.id} />
                ))
              ) : (
                <p>No past bookings</p>
              )}
            </Container>
          </Tab>
          <Tab eventKey="future" title=" All Upcoming Meetings">
            <Container className="d-flex flex-column justify-content-center align-items-center">
              {futureBookings.length > 0 ? (
                futureBookings.map((booking) => (
                  <BookingInfoCardLarge key={booking.id} booking={booking} />
                ))
              ) : (
                <p>No future bookings</p>
              )}
            </Container>
          </Tab>
          <Tab eventKey="past" title="All Past Meetings">
            <Container className="d-flex flex-column justify-content-center align-items-center">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <BookingInfoCardLarge booking={booking} key={booking.id} />
                ))
              ) : (
                <p>No past bookings</p>
              )}
            </Container>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Bookings;
