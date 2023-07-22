import React from "react";
import AddProductModal from "./AddProductModal";
import { Check, Save, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  useTheme,
  RectangleProgress,
  Fab,
  Typography,
} from "@mui/material";
import axios from "axios";

import { useSelector } from "react-redux";

const ConfirmDelete = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = async (e) => {
    let url;
    let msg;
    setLoading(true);
    const id = props.id;
    handleClose();

    if (props.tagMode === true) {
      url = `http://localhost:8080/api/admin/dashboard/removeTag/${id}`;
      msg = "Tag deleted successfully";
    } else if (props.productMode === true) {
      url = `http://localhost:8080/api/admin/dashboard/removeProduct/${id}`;
      msg = "Product deleted successfully";
    } else {
      url = `http://localhost:8080/api/admin/dashboard/removeCategory/${id}`;
      msg = "Category deleted successfully";
    }

    try {
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result) {
        props.setSnackbar({
          children: msg,
          severity: "success",
        });
        setSuccess(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      props.setSnackbar({
        children: error.response.data.message || "Something went wrong",
        severity: "failed",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <Box
          sx={{
            p: 2,
            // backgroundColor: theme.palette.primary[100],
            display: "flex",
            borderRadius: "12px",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center",
            mt: "3rem",
            gap: "1rem",
          }}
        >
          <Typography sx={{ color: theme.palette.primary.main }} variant="h6">
            Confirm Delete?
          </Typography>
          <Box>
            <Button
              sx={{
                m: "1rem",
                color: "ghostwhite",
                backgroundColor: "red",
                "&:hover": {
                  color: theme.palette.secondary[100],
                  backgroundColor: theme.palette.secondary[400],
                },
              }}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
            <Button
              sx={{
                
                m: "1rem",
                color: theme.palette.secondary[100],
                "&:hover": {
                  color: theme.palette.primary[100],
                  backgroundColor: theme.palette.primary[600],
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </AddProductModal>
      <Box
        sx={{
          m: 1,
          position: "relative",
        }}
      >
        {success ? (
          <Box
            color="primary"
            sx={{
              color: "ghostwhite",
              height: 40,
              display: "flex",
              borderRadius: "12px",
              backgroundColor: "#42dd04",
              "&:hover": {
                backgroundColor: "#31a901",
              },
            }}
          >
            <Button>
              <Check /> Success
            </Button>
          </Box>
        ) : (
          <Box
            color="primary"
            sx={{
              color: "ghostwhite",
              height: 40,
              display: "flex",

              borderRadius: "12px",
              color: "white",
              backgroundColor: theme.palette.secondary[300],
              "&:hover": {
                color: theme.palette.secondary[600],
                backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={handleOpen}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: theme.palette.secondary[300],
                "&:hover": {
                  color: theme.palette.secondary[600],
                  backgroundColor: theme.palette.secondary[100],
                },
              }}
            >
              <Delete /> Delete{" "}
            </Button>
          </Box>
        )}
        {loading && (
          <CircularProgress
            size={32}
            sx={{
              borderRadius: 10,
              height: 40,
              width: 200,
              position: "absolute",
              color: "#42dd04",
              top: 5,
              left: 5,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ConfirmDelete;
