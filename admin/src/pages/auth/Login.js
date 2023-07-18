import React, { useContext, useEffect } from "react";
import Input from "./Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import { useForm } from "../../hooks/form-hook";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "../../Components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../state/authSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TransitionsModal from "../../Components/LoadingModal";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [showPWD, setShowPWD] = React.useState(false);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        invalid: false,
      },
      password: {
        value: "",
        invalid: false,
      },
    },
    false
  );
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/admin/auth/login`, {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      console.log(response);
      setIsLoading(false);
      dispatch(
        authActions.login({
          userId: response.data.userId,
          token: response.data.token,
          data: response.data,
        })
      );
      // props.onCancel();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <Logo />
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      <form className="login" onSubmit={loginSubmitHandler}>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email address."
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type={showPWD ? "text" : "password"}
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        ></Input>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setShowPWD(!showPWD);
          }}
          sx={{
            "&:hover": {
              color: "white",
            },
          }}
        >
          {showPWD ? (
            <>
              <VisibilityOffIcon /> Hide
            </>
          ) : (
            <>
              <RemoveRedEyeIcon /> Show
            </>
          )}
        </Button>
        <button
          type="submit"
          size="small"
          className="center button submit-btn"
          disabled={!formState.isValid}
        >
          Login
        </button>
      </form>
      <Link className="" to={"/auth/signup"}>
        <Button
          sx={{
            m: "1rem",
            color: "ghostwhite",
            "&:hover": {
              color: "#252d58",
              backgroundColor: "white",
            },
          }}
        >
          Don't have an account? Sign up
        </Button>
      </Link>
    </div>
  );
};

export default Login;
