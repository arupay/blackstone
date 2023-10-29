import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Container from 'react-bootstrap/Container';


//NAV(Always Present)
import NavBar from "./Components/NavBar"


import Homepage from "../src/Pages/Homepage"
import SingleMeetingRoom from "./Pages/SingleMeetingRoom"
import NewRoom from "./Pages/NewRoom"
import Bookings from "./Pages/Bookings"
import SingleBooking from "./Pages/SingleBooking"



function App() {
  return (
  <Router>
    <Container>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/meetingrooms/:id"  element={<SingleMeetingRoom/>}   />
    <Route path="/meetingrooms/new"  element={<NewRoom/>}   />
    <Route path="/bookings"  element={<Bookings/>}   />
    <Route path="/bookings/:id"  element={<SingleBooking/>}   />
    </Routes>
    </Container>
  </Router>

  );
}

export default App;
