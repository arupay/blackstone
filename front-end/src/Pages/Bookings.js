import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Tab, Tabs } from "react-bootstrap";
import BookingInfoCardLarge from "../Components/BookingInfoCardLarge";

const API = process.env.REACT_APP_API_URL;

function Bookings(props) {
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/bookings/`)
      .then((res) => {
        const now = new Date();
        const { past, future } = res.data.payload.reduce(
          (acc, booking) => {
            const endDate = new Date(booking.end_date);
            if (endDate < now) {
              acc.past.push(booking);
            } else {
              acc.future.push(booking);
            }
            return acc;
          },
          { past: [], future: [] }
        );

        // Sort past bookings from the most recent to the oldest
        const sortedPastBookings = past.sort(
          (a, b) => new Date(b.end_date) - new Date(a.end_date)
        );
        // Sort future bookings from the soonest to the latest
        const sortedFutureBookings = future.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );

        setPastBookings(sortedPastBookings);
        setFutureBookings(sortedFutureBookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <span className="index-title reverse">
        <h1 className="index-title-text reverse"></h1>
      </span>{" "}
      <Container>
        <Tabs defaultActiveKey="future" id="bookings-tab" className="mb-3">
          <Tab eventKey="future" title="Upcoming Meetings">
            <div className="d-flex flex-column align-items-center">
              {futureBookings.length > 0 ? (
                futureBookings.map((booking) => (
                  <div key={booking.id} className="w-100">
                    <BookingInfoCardLarge booking={booking} />
                  </div>
                ))
              ) : (
                <p>No future bookings</p>
              )}
            </div>
          </Tab>
          <Tab eventKey="past" title="Past Meetings">
            <div className="d-flex flex-column align-items-center">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div key={booking.id} className="w-100">
                    <BookingInfoCardLarge booking={booking} />
                  </div>
                ))
              ) : (
                <p>No past bookings</p>
              )}
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Bookings;
