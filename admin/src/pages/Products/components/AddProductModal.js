import React from "react";
import { Box, Backdrop, Modal, Fade } from "@mui/material";
import Logo from "../../../Components/Logo";
import AddProduct from "../../../Components/AddProduct";
//ADD PRODUCT FORM MODAL MODAL

const style = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flexWrap: "nowrap",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#141937",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

const AddProductModal = ({ handleClose, open }) => {
  return (
    <div>
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
          <Box sx={style}>
            <Logo />
            <AddProduct onClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProductModal;
