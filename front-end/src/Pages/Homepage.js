import React, { useState, useEffect } from "react";
import axios from "axios";
import FindAvailableRooms from "../Components/FindAvailableRooms";
import ShowRooms from "../Components/ShowRooms";
import Container from "react-bootstrap/Container";
import "../Pages/Homepage.scss";

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
      <div className="aboutimg text-center">
        <div className="d-flex justify-content-center">
          <div className="aboutimg__mask">
            <div className="aboutimg__abouttext text-white m-1"></div>
          </div>
        </div>
      </div>
      <span className="index-title">
        <h1 className="index-title-text">Find A Meeting room</h1>
      </span>
      <Container>
        <FindAvailableRooms setRooms={setRooms} />
        <hr className="dark-line" />
        <h2 className="booklist-single">Meeting Rooms</h2>
        <ShowRooms rooms={rooms} />
      </Container>
    </>
  );
}

export default Homepage;
