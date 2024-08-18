"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [nameFieldTouched, setNameFieldTouched] = useState(false);
  const [emailFieldTouched, setEmailFieldTouched] = useState(false);
  const [phoneFieldTouched, setPhoneFieldTouched] = useState(false);

  const router = useRouter();

  const watchName = watch("name");
  const watchEmail = watch("email");
  const watchPhone = watch("phoneNumber");
  const watchTerms = watch("terms");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setSignUpCompleted(true);
  };

  useEffect(() => {
    if (signUpCompleted) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        router.push("/login");
      }

      return () => clearInterval(countdownInterval);
    }
  }, [signUpCompleted, countdown, router]);

  const isNameValid = /^[A-Za-z]{2,} [A-Za-z]{2,}$/.test(watchName);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    watchEmail
  );
  const isPhoneValid = /^\d{10}$/.test(watchPhone);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && watchTerms;

  return (
    <div id="sign-up-page" className="my-16 w-full px-4">
      {signUpCompleted ? (
        <div className="bg-primary rounded-2xl py-40 my-10 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
          <p className="text-center text-green-500 text-lg p-5">
            Sign up completed successfully! You can now log in.
            <br />
            Redirecting in {countdown} seconds...
          </p>
          <div className="mx-auto text-center my-5">
            <Link href="/login">
              <button className="bg-white p-2 w-4/6 rounded-2xl">Login</button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="my-10 text-center text-2xl">
            Welcome to Philly Truce.
          </h1>
          <fieldset
            className={`border-2 ${
              nameFieldTouched && !isNameValid
                ? "border-red-500"
                : "border-accent2"
            } rounded`}
          >
            <legend className="text-xs mx-3 px-1">Name</legend>
            <input
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]{2,} [A-Za-z]{2,}$/,
                  message: "Please enter your full name (First Last)",
                },
              })}
              placeholder="John Smith"
              className="p-4 focus:outline-none w-full"
              onFocus={() => setNameFieldTouched(false)}
              onBlur={() => setNameFieldTouched(true)}
            />
          </fieldset>
          {nameFieldTouched && !isNameValid && (
            <span className="text-xs text-red-500">
              Please fill out your full name
            </span>
          )}

          <fieldset
            className={`border-2 ${
              emailFieldTouched && !isEmailValid
                ? "border-red-500"
                : "border-accent2"
            } rounded`}
          >
            <legend className="text-xs mx-3 px-1">Email</legend>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="abc@gmail.com"
              className="p-4 focus:outline-none w-full"
              onFocus={() => setEmailFieldTouched(false)}
              onBlur={() => setEmailFieldTouched(true)}
            />
          </fieldset>
          {emailFieldTouched && !isEmailValid && (
            <span className="text-xs text-red-500">
              Please enter a valid email address with "@" and domain name
            </span>
          )}

          <fieldset
            className={`border-2 ${
              phoneFieldTouched && !isPhoneValid
                ? "border-red-500"
                : "border-accent2"
            } rounded`}
          >
            <legend className="text-xs mx-3 px-1">Phone Number</legend>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              placeholder="1234567890"
              className="p-4 focus:outline-none w-full"
              onFocus={() => setPhoneFieldTouched(false)}
              onBlur={() => setPhoneFieldTouched(true)}
            />
          </fieldset>
          {phoneFieldTouched && !isPhoneValid && (
            <span className="text-xs text-red-500">
              Please enter a 10-digit phone number
            </span>
          )}

          <div className="flex items-center space-x-3 my-5 w-fit">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must agree to the terms and conditions",
              })}
            />
            <label htmlFor="terms">
              I agree with{" "}
              <span className="text-blue-500 underline">
                terms and conditions
              </span>{" "}
              at Philly Truce.
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
          )}

          <div className="flex items-center justify-center space-x-8 mt-16">
            <Link href="/login">
              <button type="button" className="text-red-500">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className={`rounded-2xl px-3 py-1 ${
                isFormValid
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
