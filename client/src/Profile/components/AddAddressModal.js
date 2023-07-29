import React, { useEffect } from "react";
import Modal from "../../shared/components/UI/Modal/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import Input from "../../shared/components/UI/Input/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
const AddAddressModal = (props) => {
  // auth/user/addAddress
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = React.useState(false);

  const [formState, inputHandler] = useForm(
    {
      street: {
        value: "",
        invalid: false,
      },
      city: {
        value: "",
        invalid: false,
      },
      description: {
        value: "",
        invalid: false,
      },
    },
    false
  );

  console.log(token);
  const SubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const id = props.toast.loading("Please wait...");
    try {
      const response = await axios.post(
        "/auth/user/addAddress",
        {
          street: formState.inputs.street.value,
          city: formState.inputs.city.value,
          description: formState.inputs.description.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        props.toast.update(id, {
          render: "Address Added Successfully",
          type: "success",
          ...props.config,
          isLoading: false,
        });
      }

      setIsLoading(false);
      props.onCancel();
    } catch (err) {
      setIsLoading(false);
      props.toast.update(id, {
        render: "Failed to add.",
        type: "error",
        ...props.config,
        isLoading: false,
      });
      props.onCancel();
    }
  };
  return (
    <>
      <Modal
        show={props.modalIsOpen}
        onCancel={() => props.setModalIsOpen(false)}
        onSubmit={SubmitHandler}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="login">
          <Input
            id="street"
            type="text"
            placeholder="Al-masry st."
            label="Street"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your street name."
            element="input"
            onInput={inputHandler}
          />
          <Input
            id="city"
            type="text"
            label="City name"
            placeholder="e.g. Cairo"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a city name."
            element="input"
            onInput={inputHandler}
          />

          <Input
            id="description"
            type="text"
            label="Description"
            placeholder="Detailed description of your address for our riders."
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter address' description."
            element="textarea"
            onInput={inputHandler}
          />
          <button
            size="small"
            className="center button login-button"
            disabled={!formState.isValid}
          >
            Add Address
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddAddressModal;
