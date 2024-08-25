import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, usertype, password);

    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        usertype,
        password,
      });
      if (response.data.res === "created") {
        router.push("/login");
      }
      // Save token to localStorage or cookie
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("username", response.data.username);
      // router.push("/");
    } catch (err) {
      setError("Invalid username or password");
      console.log(err);
    }
  };

  // console.log(username, usertype, password);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="uppercase text-4xl text-dark font-semibold my-10 md:text-2xl">
        WELCOME TO EUDAIMONIA
      </h1>
      <Link
        className="text-xl mb-6 text-altDark hover:underline hover:text-acc"
        href="/login"
      >
        Already have an account?{" "}
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-primary rounded-xl w-[50%] md:w-[75%] py-12 px-10 sm:px-5 flex flex-col items-start"
      >
        <div className="mb-10 flex flex-row justify-center items-center text-dark">
          <label className="mx-3">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-dark rounded-md text-sm px-3 py-2"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-10 flex flex-row justify-center items-center text-dark">
          <label className="mx-3">Who are you?</label>
          <div class="flex items-center mr-5">
            <input
              id="default-radio-1"
              type="radio"
              value="doctor"
              name="default-radio"
              onChange={(e) => setUsertype(e.target.value)}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-dark"
            >
              Doctor
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="patient"
              name="default-radio"
              onChange={(e) => setUsertype(e.target.value)}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={usertype === "patient"}
            />
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-dark"
            >
              Patient
            </label>
          </div>
        </div>
        <div className="mb-10 flex flex-row justify-center items-center text-dark">
          <label className="mx-3">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-dark rounded-md text-sm px-3 py-2"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="bg-light text-xl font-bold px-8 py-2 rounded-md hover:bg-primaryDark hover:text-light ml-auto"
        >
          Sign Up
        </button>
      </form>
      {/* {error && <p className="text-light">{error}</p>} */}
    </div>
  );
};

export default Register;
