import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Components/Header";
import { useGetOrdersQuery } from "../../state/api";
// import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
const Orders = () => {
  const theme = useTheme();

  // value to send to backend

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetOrdersQuery({
    page,
    pageSize,
    sort:JSON.stringify(sort),
    search,
  });
  console.log(data);


  return <div>Orders</div>;
};

export default Orders;
