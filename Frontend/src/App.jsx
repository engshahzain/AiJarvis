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
import CustomizePage from "./Components/Pages/CustomizePage";
import CustomizePage2 from "./Components/Pages/CustomizePage2";
import { UserdataContext } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { userData, loading } = useContext(UserdataContext);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userData ? (
                userData.assistantImg && userData.assistantName ? (
                  <HomePage />
                ) : (
                  <Navigate to="/customize" />
                )
              ) : (
                <Navigate to="/login" />
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
            element={userData ? <CustomizePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/customize2"
            element={userData ? <CustomizePage2 /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
