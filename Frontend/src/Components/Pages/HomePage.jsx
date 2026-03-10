import React, { useContext } from "react";
import { UserdataContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const { userData, setUserData } = useContext(UserdataContext);
  const Navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/api/Auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      console.log(res.data.message);
      Navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full flex flex-col h-screen  relative py-10 bg-gradient-to-t from-black to-blue-900">
      <Link
        to={"/customize"}
        className="absolute top-5 left-5 text-black font-medium bg-white rounded-lg px-5 py-2 hover:bg-gray-400 transition-all duration-150"
      >
        Customize
      </Link>
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 text-black font-medium bg-white rounded-lg px-5 py-2 hover:bg-gray-400 transition-all duration-150"
      >
        Logout
      </button>

      <div className="flex items-center justify-center flex-1 w-full flex-col">
        <div className="w-full max-w-[300px]  bg-red-500 h-[450px] flex items-center justify-center rounded-3xl overflow-hidden">
          <img
            className="object-cover w-full object-top h-full"
            src={userData?.assistantImg}
            alt=""
          />
        </div>
        <h1 className="text-white text-2xl my-2 font-medium">
          I' am {userData?.assistantName}
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
