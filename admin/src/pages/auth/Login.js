import React, { useContext, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../state/authSlice";
const Login = (props) => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
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
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <p className="errmsg">{error}</p>}
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
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
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
        <button className="change-mode-btn">
          Don't have an account? Sign up
        </button>
      </Link>
    </div>
  );
};

export default Login;
