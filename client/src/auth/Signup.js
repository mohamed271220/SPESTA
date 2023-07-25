import React, { useContext } from "react";
import Input from "../shared/components/UI/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/Loading/LoadingSpinner/LoadingSpinner";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
const Signup = (props) => {
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
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      const data = await axios.post(`/auth/signup`, formData);

      setIsLoading(false);
      auth.login(data.data.userId, data.data.token, data.data);

      navigate("/");
      props.onCancel();
    } catch (err) {
      setError(
        err.response.data.message || err.message || "Something went wrong"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <p className={error ? "errMsg" : ""}>{error}</p>
      {isLoading && <LoadingSpinner />}
      <form className="login" onSubmit={signupSubmitHandler}>
        <h2>SignUp</h2>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Make sure that your password is strong"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="name"
          type="name"
          label=" Name"
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
          size="small"
          className="center button login-button"
          danger
          //   onClick={signupSubmitHandler}
        >
          Signup
        </button>
      </form>

      <Link to={"/auth/login"}>
        <button className="sec-acc-btn">
          Already have an account? Sign in
        </button>
      </Link>
    </div>
  );
};

export default Signup;
