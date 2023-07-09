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

import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
const Login = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/auth/login`,
        {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        },
   
      );
      console.log(response);
      setIsLoading(false);
      auth.login(response.userId, response.token);
      // props.onCancel();
      navigate("/");
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false);

  };

  return (
    <>

    <div className="login-container">
      
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <p className="errmsg">{error}</p>}
      <form className="login" onSubmit={loginSubmitHandler}>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          label="E-mail"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
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
        <button
          type="submit"
          size="small"
          className="center button login-button"
          disabled={!formState.isValid}
       
        >
          Login
        </button>
      </form>
      <Link to={"/auth/signup"}>
        <button className="sec-acc-btn">Don't have an account? Sign up</button>
      </Link>
    </div>
    </>

  );
};

export default Login;
