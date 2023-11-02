import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingInfoCardLarge from "../Components/BookingInfoCardLarge";
const API = process.env.REACT_APP_API_URL;

function Bookings(props) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/bookings/`)
      .then((res) => {
        setBookings(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {bookings && bookings.length
        ? bookings.map((booking) => {
            return (
              <div key={booking.id}>
                <BookingInfoCardLarge booking={booking} />
              </div>
            );
          })
        : "No bookings"}
    </>
  );
}

export default Bookings;
