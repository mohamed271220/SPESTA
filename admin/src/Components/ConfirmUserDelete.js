import React from "react";
import AddProductModal from "./AddProductModal";
import { Check, Save, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, Fab, Typography,useTheme } from "@mui/material";
import axios from "axios";

import { useSelector } from "react-redux";


const ConfirmDelete = (props) => {
  const theme=useTheme()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = async (e) => {
    setLoading(true);
    const  id  = props.id;
    handleClose();
    try{

    const result = await axios.delete(
      `http://localhost:8080/api/admin/dashboard/deleteUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result) {
      props.setSnackbar({
        children: "User successfully Deleted",
        severity: "success",
      });
      setSuccess(true);
    }
    setLoading(false);
} catch (error) {
    setLoading(false);
    props.setSnackbar({children: error.response.data.message|| 'Something went wrong' , severity:'failed'});
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
        <Box sx={{ p: 2
        ,display: "flex",
        flexDirection: "column",
        flexWrap:'nowrap',
        alignItems: "center",
        mt:"3rem",
        gap:'1rem'
         }}>
          <Typography variant="h6">Confirm Delete?</Typography>
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
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "#42dd04",
              "&:hover": {
                backgroundColor: "#31a901",
              },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              color:"white",
              backgroundColor: theme.palette.secondary[300],
              "&:hover": {
                color: theme.palette.secondary[600],
                backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={handleOpen}
          >
            <Delete />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: "#42dd04",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ConfirmDelete;
