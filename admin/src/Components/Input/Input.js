import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";

import "./Input.css";
import { useTheme } from "@emotion/react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });
const theme=useTheme()
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };
  const element =
    props.element === "input" ? (
      <input
      style={{      color:theme.palette.grey[900]}}
        id={props.id}
        type={props.type}
        min={props.min}
        max={props.max}
        step={props.step}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        style={{      color:theme.palette.grey[900]}}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <>
      <div
        className={`form-control ${
          !inputState.isValid && inputState.isTouched && "form-control--invalid"
        }`}
      >
        <label     style={{color:theme.palette.primary.main}}  htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText} </p>
        )}
      </div>
    </>
  );
};

export default Input;
