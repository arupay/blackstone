import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tab, Tabs } from "react-bootstrap";
import BookingInfoCardLarge from "../Components/BookingInfoCardLarge";
import "./Bookings.scss";

const API = process.env.REACT_APP_API_URL;

function Bookings(props) {
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/bookings/`)
      .then((res) => {
        setPastBookings(res.data.payload.past);
        setFutureBookings(res.data.payload.future);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <span className="index-title reverse"></span>{" "}
      <Container>
        <Tabs
          defaultActiveKey="future"
          id="bookings-tab"
          className="mb-3 custom-tab"
        >
          <Tab eventKey="future" title="Upcoming Meetings">
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
          <Tab eventKey="past" title="Past Meetings">
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
