import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddRoomBirdsEye from "../assets/AddRoomBirdsEye.png";
import "./NewRoom.scss";
import { toast } from "react-toastify";
const API = process.env.REACT_APP_API_URL;

function NewRoom(props) {
  const [roomName, setRoomName] = useState("");
  const [floor, setFloor] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUserInfo = localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      toast.error("User information is not available. Please log in again.");
      return;
    }

    const { userId } = JSON.parse(storedUserInfo);
    if (!userId) {
      toast.error("User ID is not available. Please log in again.");
      return;
    }

    const roomData = {
      name: roomName,
      floor: floor,
      capacity: capacity,
      created_by: userId, // Adding the userId from localStorage
    };

    axios
      .post(`${API}/meeting-rooms`, roomData)
      .then((response) => {
        setRoomName("");
        setFloor("");
        setCapacity("");
        toast.success("Added meeting room successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add meeting room. Please try again.");
      });
  };

  return (
    <>
      <span className="index-title reverse"></span>
      <div className="container homecontainer">
        <h2 className="booklist-single my-2">Add New Meeting Room </h2>

        <div className="d-flex d-flex justify-content-evenly homecontainer__sectionone">
          <div className="d-flex homecontainer__sectionone__img">
            <img
              src={AddRoomBirdsEye}
              alt=""
              className="homecontainer__sectionone__img__imgattr"
            />
          </div>
          <div className="homecontainer__sectionone__info">
            <Form
              onSubmit={handleSubmit}
              className="homecontainer__sectionone__info__addform"
            >
              <Form.Group>
                <Form.Label>Room Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={roomName}
                  required
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Floor:</Form.Label>

                <Form.Control
                  type="number"
                  value={floor}
                  required
                  onChange={(e) => setFloor(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Capacity:</Form.Label>
                <Form.Control
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </Form.Group>
              <button type="submit" className="submitroomfindbrf">
                Add Room
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewRoom;
