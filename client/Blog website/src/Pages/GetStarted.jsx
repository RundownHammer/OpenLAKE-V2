import React from "react";
import Login from "../components/login";
import Register from "../components/register";
import { useState } from "react";
import "../css/getstarted.css";

const GetStarted = () => {

  const [loginmenu, setLoginmenu] = useState(true);

  return (
    <section className="GetStartedSection">
      <h1>Get Started</h1>
      <p>
        Welcome to the Notes website. To get started, you can either login or
        register for an account.
      </p>
      {loginmenu === true ? ( <Login /> ) : ( <Register /> )}
      <button onClick={() => setLoginmenu(!loginmenu)}>
        {loginmenu === true ? "New user ?" : "Already a user? Login"}
      </button>
    </section>
  );
};

export default GetStarted;