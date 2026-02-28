import React, { useState } from "react";
import authBG from "../../assets/authBg.png";
import RequiredInput from "../Common/RequiredInput";
import PaswordInput from "../Common/PaswordInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setloading] = useState(false);
  const onsubmit = async (data) => {
    setloading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/Auth/register",
        data,
      );
      if (!res.data.success) {
        setloading(false);
        return toast.error(res.data.message);
      }
      setloading(false);
      return toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
      console.log(
        error.response.data.message + "on Submit Data in Signup Page",
      );
    }
  };
  const password = watch("password");
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
        <h1 className="text-white font-bold text-4xl mb-7">Signup</h1>
        <RequiredInput
          name={"Name"}
          autoComplete="off"
          className="text-white"
          inputClass="text-black"
          {...register("name", {
            required: "Name is Required",
          })}
          errorName={errors.name}
          errorMessage={errors.name?.message}
        />

        <RequiredInput
          name={"Email"}
          className="text-white"
          inputClass="text-black"
          autoComplete="off"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          errorName={errors.email}
          errorMessage={errors.email?.message}
        />

        <RequiredInput
          name={"Password"}
          autoComplete="off"
          className="text-white"
          inputClass="text-black"
          type="password"
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 6,
              message: "Minimum 6 Characters",
            },
          })}
          errorName={errors.password}
          errorMessage={errors.password?.message}
        />

        <RequiredInput
          name={"ConfirmPassword"}
          autoComplete="off"
          className="text-white"
          inputClass="text-black"
          type="password"
          {...register("ConfirmPassword", {
            required: "Confirm Password is Required",
            minLength: {
              value: 6,
              message: "Minimum 6 Characters",
            },
            validate: (value) => {
              return value === password || "password do not match";
            },
          })}
          errorName={errors.ConfirmPassword}
          errorMessage={errors.ConfirmPassword?.message}
        />

        <button
          type="submit"
          className="bg-white text-black font-semibold text-sm rounded px-8 transition-all duration-150 py-3 hover:bg-gray-300 mt-3"
        >
          {loading ? "Please wait ..." : "Submit"}
        </button>
        <p className="text-white mt-2">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-400 ml-2 font-bold">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
