import React, { useContext, useState } from "react";
import authBG from "../../assets/authBg.png";
import RequiredInput from "../Common/RequiredInput";
import PaswordInput from "../Common/PaswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { UserdataContext } from "../../context/UserContext";
const LoginPage = () => {
  const [loading, setloading] = useState(false);
  const { userData, setUserData } = useContext(UserdataContext);
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
    setloading(true);
    // console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/Auth/login",
        data,
        {
          withCredentials: true,
        },
      );
      if (!res.data.success) {
        setloading(false);
        setUserData(null);
        return toast.error(res.data.message);
      }
      setloading(false);
      setUserData(res.data.user);
      Navigate("/customize");
      return toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setUserData(null);
      setloading(false);
      console.log(
        error.response.data.message + "on Submit Data in Signup Page",
      );
    }
    // console.log(data);
  };

  return (
    <div
      className={
        "h-[100vh] min-h-[100vh] w-full !bg-cover !bg-center flex items-center justify-center"
      }
      style={{ background: `url(${authBG})` }}
    >
      <form
        action=""
        className="w-full max-w-lg mx-auto  min-h-[600px] bg-[#00000062] backdrop-blur shadow-lg shadow-black px-10 py-10 "
        onSubmit={handleSubmit(onsubmit)}
      >
        <h1 className="text-white font-bold text-4xl mb-7">Login</h1>
        <RequiredInput
          name={"Email"}
          autoComplete="off"
          className="text-white"
          type="email"
          inputClass="text-black"
          {...register("email", {
            required: "Email is Required",
          })}
          errorName={errors.email}
          errorMessage={errors.email?.message}
        />
        <PaswordInput
          name={"Password"}
          inputClass="text-black"
          {...register("password", { required: "Password Required" })}
          errorName={errors.password}
          errorMessage={errors.password?.message}
          className="text-white"
        />
        <button
          type="submit"
          className="bg-white text-black font-semibold text-sm rounded px-8 transition-all duration-150 py-3 hover:bg-gray-300 mt-3"
        >
          {loading ? "Please wait" : "Submit"}
        </button>
        <p className="text-white mt-2">
          Have no account ?{" "}
          <Link to="/signup" className="text-blue-400 ml-2 font-bold">
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
