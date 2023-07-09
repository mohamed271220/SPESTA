import axios from "axios";
import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/Loading/LoadingSpinner/LoadingSpinner";
import './index.css'
const Login = () => {
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      if (!response.ok) {
        throw new Error("Request failed: " + response.message);
      }
      auth.login(response.userId, response.token);
      setEmail("");
      setPassword("");
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrMsg(
        "Login failed - Please try again error message: " +
          err.response.data.message
      );
      //   errRef.current.focus();
      setIsLoading(false);
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const content = isLoading ? (
    <LoadingSpinner />
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>

      <form className="form-control login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
        className="form-input"
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onInput={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          className="form-input"
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  )

  return content;
};

export default Login;
