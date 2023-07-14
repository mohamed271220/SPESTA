import React, { useContext } from "react";
import Input from "./Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner/LoadingSpinner";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Logo from "../../Components/Logo";
import { useDispatch } from "react-redux";
import { authActions } from "../../state/authSlice";
const Signup = (props) => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  //   const [isError, setIsError] = React.useState(undefined);
  const [error, setError] = React.useState();

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
      const data = await axios.post(`/admin/auth/signup`,  formData );
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
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <Logo />
      {/* <ErrorModal error={error} onClear={clearError} /> */}

      {isLoading && <LoadingSpinner asOverlay />}
      <form className="login" onSubmit={signupSubmitHandler}>
        <h2>SignUp</h2>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          placeholder="Make sure that your password is strong"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="adminKey"
          type="password"
          placeholder="Ask someone in management for it"
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
        <button
          disabled={!formState.isValid}
          type="submit"
          className="center button submit-btn"
 
        >
          Signup
        </button>
      </form>

      <p className={error ? "errMsg" : ""}>{error}</p>
      <Link to={"/auth/login"}>
        <button className="change-mode-btn">
          Already have an account? Sign in
        </button>
      </Link>
    </div>
  );
};

export default Signup;
