import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Components/Header";
import { useGetOrdersQuery } from "../../state/api";
import DataGridCustomToolbar from "../../Components/DataGridCustomToolbar";
import UserActions from "../../Components/UserActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Orders = () => {
  const theme = useTheme();

  // value to send to backend

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [rowId, setRowId] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, isError, error } = useGetOrdersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  // console.log(data);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 200,
      },
      {
        field: "madeBy",
        headerName: "Made By",
        width: 200,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
      },
      {
        field: "status",
        headerName: "Status",
        type: "singleSelect",
        valueOptions: ["pending", "Preparing", "Delivering", "Completed"],
        width: 100,
        editable: true,
      },
      {
        field: "products",
        headerName: "# of Products",
        width: 100,
        sortable: false,
        renderCell: (params) => params.value.length,
      },
      {
        field: "totalPrice",
        headerName: "Cost",
        width: 100,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => {
          return <UserActions {...{ params, rowId, setRowId, setSnackbar }} />;
        },
      },
    ],
    [rowId]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
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
        {!isLoading && (
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data.transactions}
            columns={columns}
            rowCount={data.total}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            processRowUpdate={(params) => setRowId(params.id)}
          />
        )}

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

export default Orders;
