import React, { useState, useEffect } from "react";
import axios from "axios";
import FindAvailableRooms from "../Components/FindAvailableRooms";
import ShowRooms from "../Components/ShowRooms";
const API = process.env.REACT_APP_API_URL;

function Homepage(props) {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms`)
      .then((res) => {
        setRooms(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <FindAvailableRooms />
      <hr className="dark-line" />

      <ShowRooms rooms={rooms} />
    </>
  );
}

export default Homepage;
