import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...credentials, email }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.originalStatus?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="login">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
            />

            <label htmlFor="password">Password:</label>
            <input
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

return content
};

export default Login;
