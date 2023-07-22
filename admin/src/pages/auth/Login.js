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
import { Button, Typography, useTheme } from "@mui/material";
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
      setError(err.response.data.message || "Something went wrong");
      // console.log(err);
    }
    setIsLoading(false);
  };

  const theme = useTheme();
  return (
    <div className="login-container">
      <Logo />
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      <form
        className="login"
        style={{
          backgroundColor: theme.palette.grey[100],
        }}
        onSubmit={loginSubmitHandler}
      >
            <Typography variant="h4" sx={{
          color:theme.palette.primary.main,
        }}>Login</Typography>
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
            color:theme.palette.primary[100],
            "&:hover": {
              color: theme.palette.primary[700],
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
        <Button
          type="submit"
          size="small"
          className="center button submit-btn"
          disabled={!formState.isValid}
          sx={{
            m: "1rem",
          
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary[200],
            "&:hover": {
              color: theme.palette.secondary[100],
              backgroundColor: theme.palette.secondary[400],
            },
            "&:disabled": {
              backgroundColor:theme.palette.grey[700],
              color: theme.palette.grey[400],
            }
          }}
        >
          <Typography variant="h6" component="div" sx={{  flexGrow: 1 }}>
            Login
          </Typography>
        </Button>
      </form>
      <Link className="" to={"/auth/signup"}>
        <Button
          sx={{
            m: "1rem",
            color: theme.palette.primary[100],
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
