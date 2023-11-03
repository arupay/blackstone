import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

//NAV(Always Present)
import NavBar from "./Components/NavBar";

import Homepage from "../src/Pages/Homepage";
import SingleMeetingRoom from "./Pages/SingleMeetingRoom";
import NewRoom from "./Pages/NewRoom";
import Bookings from "./Pages/Bookings";
import SingleBooking from "./Pages/SingleBooking";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/meetingrooms/:id" element={<SingleMeetingRoom />} />
          <Route path="/meetingrooms/new" element={<NewRoom />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<SingleBooking />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
