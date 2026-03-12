import React, { useContext, useState } from "react";
import { UserdataContext } from "../../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
const CustomizePage2 = () => {
  const {
    userData,
    selectBackendImg,
    setSelectBackendImg,
    selectImg,
    setUserData,
  } = useContext(UserdataContext);
  const [assistantName, setassistantName] = useState(
    userData?.assistantName || "",
  );
  const [loader, setloader] = useState(false);
  const Navigate = useNavigate();
  const handleUpdateAssistant = async () => {
    setloader(true);
    try {
      const formData = new FormData();

      formData.append("assistantName", assistantName);

      if (selectBackendImg) {
        formData.append("assistantImage", selectBackendImg);
      } else {
        formData.append("imgUrl", selectImg);
      }

      const result = await axios.post(
        "http://localhost:5000/api/user/update-assistant",
        formData,
        { withCredentials: true },
      );

      console.log("Result Customize page 2:", result.data);

      setUserData(result.data.user);
      Navigate("/");
      setloader(false);
    } catch (error) {
      console.log("error", error);
      setloader(false);
    }
  };
  return (
    <div className="w-full relative bg-gradient-to-t from-black to-blue-900">
      {" "}
      <button
        onClick={() => Navigate("/customize")}
        className=" px-10  absolute top-5 left-1 cursor-pointer text-white text-4xl"
      >
        <IoChevronBackCircle />
      </button>
      <div className=" min-h-screen  flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-white font-bold text-center mb-5">
            Enter Your Assitant Name
          </h1>
          <form action="" className="flex flex-col items-center justify-center">
            <input
              type="text"
              name="assistantName"
              placeholder="ex.JArvis"
              value={assistantName}
              onChange={(e) => setassistantName(e.target.value)}
              className="bg-transparent px-4 text-white w-full rounded-full py-3 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id=""
            />{" "}
            {assistantName && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Navigate("/customize2");
                  handleUpdateAssistant();
                }}
                className="bg-white px-10 py-3 font-sans font-bold rounded-full mt-5 hover:bg-slate-200 transition-all ease-in-out duration-150"
              >
                {loader ? "Loading ... " : " Finally Create Your"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage2;
