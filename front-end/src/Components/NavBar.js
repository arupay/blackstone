import React from 'react';
import Nav from 'react-bootstrap/Nav';

function NavBar(props) {
    return (
        <Nav justify variant="underline" defaultActiveKey="/home" className="my-4">
        <Nav.Item>
          <Nav.Link href="/">Meeting Rooms</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/bookings" eventKey="/bookings">Bookings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/meetingrooms/new" eventKey="/meetingrooms/new">New Room</Nav.Link>
        </Nav.Item>
      </Nav>
    );
}

export default NavBar;
