import React, { useState } from "react";
import authBG from "../../assets/authBg.png";
import RequiredInput from "../Common/RequiredInput";
import PaswordInput from "../Common/PaswordInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
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
          Submit
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
