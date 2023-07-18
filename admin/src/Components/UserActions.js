import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const UserActions = ({ params, rowId, setRowId,setSnackbar }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const token = useSelector((state) => state.auth.token);

    // console.log(params);
  //   console.log(rowId);
  const handleSubmit = async () => {
    setLoading(true);
    const { _id, status } = params.row;
    const result = await axios.put(
      `admin/dashboard/orders/${_id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (result) {
        setSnackbar({ children: 'User successfully saved', severity: 'success' });
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  //   console.log(rowId, " ", params.row._id);

  return (
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
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
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
  );
};

export default UserActions;
