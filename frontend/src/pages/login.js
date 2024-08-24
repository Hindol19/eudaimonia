import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //   console.log(username, password);
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      console.log(response.data);

      // Save token to localStorage or cookie
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("usertype", response.data.usertype);
      console.log("Fine");

      if (localStorage.usertype === "patient") router.push("/question");
      else router.push("/answer");
    } catch (err) {
      setError("Invalid username or password");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="uppercase text-4xl text-dark font-semibold my-10 md:text-2xl">
        PLEASE LOGIN
      </h1>
      <Link
        className="text-xl mb-6 text-altDark hover:underline hover:text-acc"
        href="/register"
      >
        Don't have an account? Sign Up!
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
          Log In
        </button>
      </form>
      {/* {error && <p className="text-light">{error}</p>} */}
    </div>
  );
};

export default Login;
