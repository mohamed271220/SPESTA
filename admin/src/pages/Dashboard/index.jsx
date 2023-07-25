import React, { useContext } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../Components/Header";
import FlexBetween from "../../Components/FlexBetween";
import meet from "./meet.png";
import TransitionsModal from "../../Components/LoadingModal";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetTagsQuery,
} from "../../state/api";
import { DataGrid } from "@mui/x-data-grid";
const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:1024px)");
  const user = useSelector((state) => state.auth.data);
  React.useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      redirect("/auth/login");
    }
  }, [navigate]);

  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  console.log(categories);
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      {user && !productsLoading && !categoriesLoading && !tagsLoading ? (
        <Box width="100%">
          <Header title="Dashboard" subtitle="Welcome to dashboard"></Header>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            justifyContent={isNonMobile ? "space-between" : "center"}
            alignItems={!isNonMobile && "center"}
            rowGap="20px"
            width="100%"
            columnGap="1.33%"
            // width= {!isNonMobile &&  "100%"}

            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <Card
              sx={{
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                height: isNonMobile ? "40vh" : "60vh",
              }}
            >
              <CardContent>
                <FlexBetween
                  sx={{
                    backgroundColor: "rgba(0,0,0, 0.1)",
                    borderRadius: "0.55rem",
                    // color: theme.palette.primary.contrastText,
                    padding: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "20vh",
                        color: theme.palette.secondary[300],
                      }}
                      variant="h4"
                    >
                      Welcome{" "}
                      <Typography
                        sx={{
                          color: theme.palette.primary[200],
                        }}
                        variant="h5"
                      >
                        {user.name}
                      </Typography>
                    </Typography>

                    <Avatar
                      src={`http://localhost:8080/${user.image}`}
                      sx={{ width: "10vh", height: "10vh" }}
                    />
                  </Box>
                  <img
                    src={meet}
                    style={{
                      width: isNonMobile ? "17vh" : "10vh",
                      height: isNonMobile ? "17vh" : "10vh",
                    }}
                    alt="peopleInMeeting"
                  />
                </FlexBetween>
                <Box
                  sx={{
                    display: "flex",
                    gap: "3rem",
                    padding: isNonMobile ? "1.9rem" : "3rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "2vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Products{" "}
                    <span style={{ color: theme.palette.primary[200] }}>
                      {" "}
                      +{products?.products.length}
                    </span>
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "2vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Categories{" "}
                    <span style={{ color: theme.palette.primary[200] }}>
                      {" "}
                      +{categories?.data.length}
                    </span>
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "2vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Tags{" "}
                    <span style={{ color: theme.palette.primary[200] }}>
                      {" "}
                      +{tags?.data.length}
                    </span>
                  </Typography>
                </Box>
              </CardContent>
              <CardActions></CardActions>
            </Card>
            <Card
              sx={{
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                // width: isNonMobile ? "40%" : "100%",
                height: isNonMobile ? "40vh" : "80vh",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    borderRadius: "0.55rem",
                    // color: theme.palette.primary.contrastText,
                    padding: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      width: "20vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                    }}
                    variant="h2"
                  >
                    PRODUCTS
                  </Typography>
                  <Box
                    height={isNonMobile ? "30vh" : "50vh"}
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
                      rows={products?.products}
                      getRowId={(row) => row._id}
                      loading={productsLoading}
                      columns={[
                        { field: "name", headerName: "Name", width: 200 },
                        { field: "price", headerName: "Price", width: 200 },
                      ]}
                      pageSize={1}
                      rowsPerPageOptions={[3]}
                    />
                  </Box>
                </Box>
              </CardContent>
              <CardActions></CardActions>
            </Card>
            <Card
              sx={{
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                // width: isNonMobile ? "40%" : "100%",
                height: isNonMobile ? "40vh" : "80vh",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    borderRadius: "0.55rem",
                    // color: theme.palette.primary.contrastText,
                    padding: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      width: "20vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                    }}
                    variant="h2"
                  >
                    CATEGORIES
                  </Typography>
                  <Box
                    height={isNonMobile ? "30vh" : "50vh"}
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
                      rows={categories?.data}
                      getRowId={(row) => row._id}
                      loading={productsLoading}
                      columns={[
                        { field: "name", headerName: "Name", width: 200 },
                        { field: "_id", headerName: "ID", width: 200 },
                      ]}
                      pageSize={1}
                      rowsPerPageOptions={[3]}
                    />
                  </Box>
                </Box>
              </CardContent>
              <CardActions></CardActions>
            </Card>
            <Card
              sx={{
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                // width: isNonMobile ? "40%" : "100%",
                height: isNonMobile ? "40vh" : "80vh",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    borderRadius: "0.55rem",
                    // color: theme.palette.primary.contrastText,
                    padding: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      width: "20vh",
                      fontWeight: "600",
                      color: theme.palette.secondary[300],
                    }}
                    variant="h2"
                  >
                    TAGS
                  </Typography>
                  <Box
                    height={isNonMobile ? "30vh" : "50vh"}
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
                      rows={tags?.data}
                      getRowId={(row) => row._id}
                      loading={productsLoading}
                      columns={[
                        { field: "name", headerName: "Name", width: 200 },
                        { field: "_id", headerName: "ID", width: 200 },
                      ]}
                      pageSize={1}
                      rowsPerPageOptions={[3]}
                    />
                  </Box>
                </Box>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Box>
        </Box>
      ) : (
        <TransitionsModal />
      )}
    </Box>
  );
};

export default Dashboard;
