import React from "react";
import { Avatar, Box, useTheme } from "@mui/material";
import { useGetUsersQuery } from "../../state/api";
import Header from "../../Components/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddProductModal from "../../Components/AddProductModal";
import ConfirmDelete from "../../Components/ConfirmUserDelete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Users = () => {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useGetUsersQuery();
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const users = data || [];


  console.log(data);
  const columns = React.useMemo(
    () => [
      {
        field: "image",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => (
          <Avatar src={`http://localhost:8080/${params.row.image}`} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "_id", headerName: "ID", width: 220 },
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "email",
        headerName: "email",
        width: 200,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <>
            <ConfirmDelete
              // open={open}
              // handleOpen={handleOpen}
              // handleClose={handleClose}
              id={params.row._id}
              setSnackbar={setSnackbar}
            />
          </>
        ),
      },
    ],
    []
  );
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS" subtitle="List of Users" />
      <Box
        mt="40px"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={users.users || []}
          columns={columns}
        />

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
    </Box>
  );
};

export default Users;
