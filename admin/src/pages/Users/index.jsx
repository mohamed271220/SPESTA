import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUsersQuery } from "../../state/api";
import Header from "../../Components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useGetUsersQuery();

  const users = data || [];

  console.log(data);
  const columns = [
    { field: "_id", headerName: "ID", width: 200},
    {
      field: "name",
      headerName: "Name",
      width: 200
    },
    {
      field: "email",
      headerName: "email",
      width: 200
    },
  ];
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
      </Box>
    </Box>
  );
};

export default Users;
