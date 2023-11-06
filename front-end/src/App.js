import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Amplify, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./App.css";

//NAV(Always Present)
import NavBar from "./Components/NavBar";

import Homepage from "../src/Pages/Homepage";
import SingleMeetingRoom from "./Pages/SingleMeetingRoom";
import NewRoom from "./Pages/NewRoom";
import Bookings from "./Pages/Bookings";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_6yW8uFaIM",
    userPoolWebClientId: "3ctcc7m5jerrasjmbec0p0haqk",
    oauth: {
      domain: "roomlink.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid"],
      redirectSignIn:
        process.env.REACT_APP_ENV === "production"
          ? "https://room-link.netlify.app/"
          : "http://localhost:3000",
      redirectSignOut:
        process.env.REACT_APP_ENV === "production"
          ? "https://room-link.netlify.app/signout"
          : "http://localhost:3000",
      responseType: "code",
    },
  },
});
console.log(process.env.REACT_APP_ENV);
const API = process.env.REACT_APP_API_URL;
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check for the user's authentication state
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.signInUserSession.idToken.payload.email;

      setIsAuthenticated(true);
      setUser(user);
      handleUserData(email);

      console.log("User", user);
    } catch (err) {
      console.error("Error during authentication check: ", err);
      window.location.assign(
        "https://roomlink.auth.us-east-1.amazoncognito.com/login?client_id=3ctcc7m5jerrasjmbec0p0haqk&response_type=code&scope=email+openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000"
      );
    }
  };

  const handleUserData = async (email) => {
    try {
      const response = await axios.get(`${API}/users/${email}`);
      const userId = response.data.payload.id;
      localStorage.setItem("userInfo", JSON.stringify({ userId, email }));
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            // If the user is not found, create a new user
            try {
              const newUserResponse = await axios.post(`${API}/users`, {
                email,
              });
              const newUserId = newUserResponse.data.payload.id;
              localStorage.setItem(
                "userInfo",
                JSON.stringify({ userId: newUserId, email })
              );
            } catch (postError) {
              console.error(
                "Error creating user: ",
                postError.response || postError
              );
            }
            break;
          case 409:
            // User already exists, no action needed, don't log an error
            break;
          default:
            console.error("Error fetching user: ", error.response || error);
            break;
        }
      } else {
        console.error("Error: ", error.message);
      }
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("userInfo");
      // Redirect to sign in after sign out
      checkAuthState();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <div>Loading...</div>; // You could also render a spinner or a login prompt
    }

    return children;
  };
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
        <NavBar signOut={signOut} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetingrooms/:id"
            element={
              <ProtectedRoute>
                <SingleMeetingRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meetingrooms/new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
