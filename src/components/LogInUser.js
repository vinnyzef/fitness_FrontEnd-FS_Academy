import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LogInUser } from "../api";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitInformation = async (e) => {
    e.preventDefault();
    await LogInUser(username, password)
    const token = localStorage.getItem("token")
    if (token) {
        navigate("/Routines");
     } else {
       console.log("Invalid Login, Try Again")
     }
    setUsername("");
    setPassword("")
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitInformation}>
        <input
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        ></input>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        ></input>
        <button styles={{ width: "100px", height: "50px" }}>Submit</button>
      </form>
    </div>
  );
};

export default LogIn;