import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import roomlinklogotransparent from "../assets/roomlinklogo-transparent.png";

function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar
      bg="light"
      data-bs-theme="dark"
      sticky="top"
      expand="md"
      collapseOnSelect
      className="wholenav"
    >
      <Container>
        <Navbar.Brand className="d-inline-block">
          <a href="/">
            <img
              style={{
                width: "160px",
                height: "160px",
              }}
              src={roomlinklogotransparent}
              alt="room link logo"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Nav>
            <Nav.Link
              className={`nav-text ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => navigate("/")} // Replaced href with onClick
            >
              Meeting Rooms
            </Nav.Link>
            <Nav.Link
              className={`nav-text ${
                location.pathname === "/bookings" ? "active" : ""
              }`}
              onClick={() => navigate("/bookings")} // Replaced href with onClick
            >
              Bookings
            </Nav.Link>
            <Nav.Link
              className={`nav-text ${
                location.pathname === "/meetingrooms/new" ? "active" : ""
              }`}
              onClick={() => navigate("/meetingrooms/new")} // Replaced href with onClick
            >
              New Room
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
