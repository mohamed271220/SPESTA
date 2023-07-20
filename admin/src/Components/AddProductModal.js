import React from "react";
import { Box, Backdrop, Modal, Fade,useTheme } from "@mui/material";
import Logo from "./Logo";
import AddProduct from "./AddProduct";
import { Outlet } from "react-router-dom";

//ADD PRODUCT FORM MODAL MODAL

const style = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  flexDirection: "column",
  flexWrap: "nowrap",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  border: "2px solid #000",
  boxShadow: 24,
  // overflow: "scroll",
  
  overflowY:"scroll",
  height: "80%",
  p: 4,
};

const AddProductModal = ({ children, handleClose, open }) => {
  const theme=useTheme()
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          overflow: "scroll",
        }}
      >
        <Fade in={open}>
          <Box sx={{...style,backgroundColor: theme.palette.primary[700] }}>
            <Logo />
            {/* <AddProduct onClose={handleClose} /> */}
            {children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddProductModal;
