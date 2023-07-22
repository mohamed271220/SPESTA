import React, { useContext, useEffect } from "react";
import Input from "./Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TransitionsModal from "./LoadingModal";



import "./AddProduct.css";
import { Button, useTheme } from "@mui/material";


const EditProfile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.data);
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    setFormData(
      {
        name: {
          value: user.name,
          isValid: true,
        },
        email: {
          value: user.email,
          isValid: true,
        },
      },
      true
    );
  }, [user.name, user.email]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/auth/edit/${props.id}`,
        {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
        },
        {
          headers: {
            
            Authorization: "Bearer " + user.token,
          },
        }
      );
      if (response.data) {
        props.setSnackbar({
          children: "User edited please resign in to see changes",
          severity: "success",
        });
        setIsLoading(false);
        props.onClose();
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message);
      props.setSnackbar({
        children:  "Something went wrong",
        severity: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="add-product-container">
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      {user ? (
        <form
          style={{
            backgroundColor: theme.palette.primary[100],
          }}
          className="login"
          onSubmit={formSubmitHandler}
        >
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Make it something catchy"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name"
            element="input"
            onInput={inputHandler}
            initialValue={user.name}
            initialValid={true}
          />

          <Input
            id="email"
            type="text"
            label="Email"
            placeholder="Make it something catchy"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter product email"
            element="input"
            onInput={inputHandler}
            initialValue={user.email}
            initialValid={true}
          />

          <Button
            type="submit"
            className="submit-btn"
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "larger",
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary[200],
              "&:hover": {
                color: theme.palette.secondary[100],
                backgroundColor: theme.palette.secondary[400],
              },
              "&:disabled": {
                backgroundColor: theme.palette.grey[700],
                color: theme.palette.grey[400],
              },
            }}
            disabled={!formState.isValid}
          >
            EDIT PROFILE
          </Button>
        </form>
      ) : (
        <TransitionsModal />
      )}
    </div>
  );
};

export default EditProfile;
