import React, { useContext } from "react";
import Input from "./Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner/LoadingSpinner";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "../../Components/Logo";
import { useDispatch } from "react-redux";
import { authActions } from "../../state/authSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TransitionsModal from "../../Components/LoadingModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button, Typography, useTheme } from "@mui/material";

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme=useTheme()
  const [isLoading, setIsLoading] = React.useState(false);
  //   const [isError, setIsError] = React.useState(undefined);
  const [error, setError] = React.useState();
  const [showPWD, setShowPWD] = React.useState(false);

  // console.log(error);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        invalid: false,
      },
      password: {
        value: "",
        invalid: false,
      },
      image: {
        value: null,
      },
      name: {
        value: "",
        isValid: false,
      },
      adminKey: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("adminKey", formState.inputs.adminKey.value);
      formData.append("image", formState.inputs.image.value);
      console.log(formData.entries());
      const data = await axios.post(`/admin/auth/signup`, formData);
      setIsLoading(false);
      dispatch(
        authActions.login({
          userId: data.data.userId,
          token: data.data.token,
          data: data.data,
        })
      );

      navigate("/");
      // props.onCancel();
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <Logo />
      {/* <ErrorModal error={error} onClear={clearError} /> */}

      {isLoading && <TransitionsModal />}
      <form 
         style={{
          backgroundColor: theme.palette.grey[100],
        }}
       className="login" onSubmit={signupSubmitHandler}>
        <Typography variant="h4" sx={{
          color:theme.palette.primary.main,
        }}>SignUp</Typography>

        <Input
          id="email"
          type="email"
          placeholder="Email e.g example@example.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type={showPWD ? "text" : "password"}
          placeholder="Enter a strong password"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setShowPWD(!showPWD);
          }}
          sx={{
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
        <Input
          id="adminKey"
          type="password"
          placeholder="Enter the admin key"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid Key"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="name"
          type="name"
          placeholder="Please enter your name"
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        />
        <Button
          disabled={!formState.isValid}
          type="submit"
          className="center button submit-btn"
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
            SignUp
          </Typography>
        </Button>
      </form>

      <p className={error ? "errMsg" : ""}>{error}</p>
      <Link to={"/auth/login"}>
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
          Already have an account? Sign in
        </Button>
      </Link>
    </div>
  );
};

export default Signup;
