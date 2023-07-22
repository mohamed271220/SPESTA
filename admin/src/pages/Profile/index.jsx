import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../../Components/Header";
import { useSelector } from "react-redux";
import TransitionsModal from "../../Components/LoadingModal";
import AddProductModal from "../../Components/AddProductModal";
import EditProfile from "../../Components/EditProfile";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Profile = () => {
  const user = useSelector((state) => state.auth.data);
  const userId= useSelector((state) => state.auth.userId);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <EditProfile id={userId} 
        onClose={handleClose}
        setSnackbar={setSnackbar}
         />
      </AddProductModal>
      {user ? (
        <Box>
          <Header title={user.name} subtitle={user.email} />
          <Box
            sx={{
              mt: 3,

              height: "100%",
              width: "100%",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box m="1.5rem">
                  <Typography
                    variant="h4"
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    Name:{" "}
                    <span style={{ color: theme.palette.secondary[200] }}>
                      {user.name}
                    </span>
                  </Typography>
                </Box>
                <Box m="1.5rem">
                  <Typography
                    variant="h4"
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    Email:{" "}
                    <span style={{ color: theme.palette.secondary[200] }}>
                      {user.email}
                    </span>
                  </Typography>
                </Box>
                <Box m="1.5rem">
                  <Typography
                    variant="h4"
                    sx={{
                      pl: "1rem",
                    }}
                  >
                    Password:{" "}
                    <span style={{ color: theme.palette.secondary[200] }}>
                      ------------
                    </span>
                  </Typography>
                </Box>
                <Box m="1.5rem">
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                    }}
                    src={`http://localhost:8080/${user.image}`}
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  padding: "1rem",
                }}
              >
                <Button
                onClick={handleOpen}
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
                >
                  Edit Profile
                </Button>
              </CardActions>
            </Card>
          </Box>
          {!!snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </Box>
      ) : (
        <TransitionsModal />
      )}
    </Box>
  );
};

export default Profile;
