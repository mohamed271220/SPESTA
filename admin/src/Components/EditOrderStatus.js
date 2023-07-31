import React from "react";
import AddProductModal from "./AddProductModal";
import { Check, Save, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Typography,
  useTheme,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";

import { useSelector } from "react-redux";
import { useState } from "react";

const EditOrder = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(props.status);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    setLoading(true);
    const id = props.id;
    handleClose();
    try {
      const result = await axios.put(
        `admin/dashboard/orders/${id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result) {
        props.setSnackbar({
          children: "Order edited successfully",
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <Box>
          <FormControl>
            <FormLabel
              sx={{
                color: theme.palette.secondary[100],
                "&.Mui-checked": {
                  color: theme.palette.secondary[100],
                },
              }}
              id="demo-row-radio-buttons-group-label"
            >
              Order Status
            </FormLabel>
            <RadioGroup
              value={value}
              onChange={handleChange}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="pending"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary[100],
                      "&.Mui-checked": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                }
                label="Pending"
              />
              <FormControlLabel
                value="completed"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary[100],
                      "&.Mui-checked": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                }
                label="Completed"
              />
              <FormControlLabel
                value="Preparing"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary[100],
                      "&.Mui-checked": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                }
                label="Preparing"
              />

              <FormControlLabel
                value="Delivering"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary[100],
                      "&.Mui-checked": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                }
                label="Delivering"
              />
            </RadioGroup>

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
          </FormControl>
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
              color: "white",
              backgroundColor: theme.palette.secondary[300],
              "&:hover": {
                color: theme.palette.secondary[600],
                backgroundColor: theme.palette.secondary[100],
              },
            }}
            onClick={handleOpen}
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
    </>
  );
};

export default EditOrder;
