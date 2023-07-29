import React, { useEffect, useState } from "react";
import AddAddress from "../assets/AddAddress.svg";
import "../index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Backdrop from "../../shared/components/UI/Backdrop/Backdrop";
import AddAddressModal from "../components/AddAddressModal";
import EditAddressModal from "../components/EditAddressModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  position: "top-center",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const Addresses = ({ addresses }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editDetails, setEditDetails] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const removedAddressHandler = async (addressId) => {
    const id = toast.loading("Please wait...");
    try {
      const response = await axios.delete(
        "/auth/user/deleteAddress/" + addressId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        toast.update(id, {
          render: "Address Edited Successfully",
          type: "success",
          ...config,
          isLoading: false,
        });
      }
    } catch (err) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        ...config,
        isLoading: false,
      });
    }
  };

  if (!addresses || addresses.length === 0) {
    return (
      <>
        {modalIsOpen && <Backdrop onClick={() => setModalIsOpen(false)} />}

        <AddAddressModal
          config={config}
          toast={toast}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          onCancel={() => setModalIsOpen(false)}
        />
        <div className="add-address-button">
          <h2>No addresses found</h2>;
          <button onClick={() => setModalIsOpen(true)}>
            <img src={AddAddress} alt="add address" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {(modalIsOpen || editModalIsOpen) && (
        <Backdrop onClick={() => setModalIsOpen(false)} />
      )}

      <AddAddressModal
        config={config}
        toast={toast}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        onCancel={() => setModalIsOpen(false)}
      />
      <div>
        <h2>Your Addresses</h2>
        <div className="addresses-container">
          {addresses.map((address, index) => (
            <>
              <EditAddressModal
                config={config}
                toast={toast}
                address={address}
                modalIsOpen={editModalIsOpen}
                setModalIsOpen={setEditModalIsOpen}
                onCancel={() => setEditModalIsOpen(false)}
              />
              <div key={address._id} className="address-card">
                <h3>address {index + 1}</h3>
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.description}</p>
                <div className="address-controls">
                  <button onClick={() => setEditModalIsOpen(true)}>Edit</button>
                  <button onClick={() => removedAddressHandler(address._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </>
          ))}
        <div className="address-card-s">
          <button
            className="add-address-button"
            onClick={() => setModalIsOpen(true)}
          >
            <img src={AddAddress} alt="add address" />
          </button>
        </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Addresses;
