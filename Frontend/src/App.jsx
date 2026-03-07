import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import SignupPage from "./Components/Pages/SignupPage";
import LoginPage from "./Components/Pages/LoginPage";
import "./App.css";
import { Toaster } from "react-hot-toast";
import CustomizePage from "./Components/Pages/CustomizePage";
import { UserdataContext } from "./context/UserContext";
const App = () => {
  const { userData, setUserData } = useContext(UserdataContext);
  // console.log(userData);
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userData?.assistantImg && userData?.assistantName ? (
                <HomePage />
              ) : (
                <Navigate to={"/customize"} />
              )
            }
          />
          <Route
            path="/signup"
            element={!userData ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!userData ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/customize"
            element={userData ? <CustomizePage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
