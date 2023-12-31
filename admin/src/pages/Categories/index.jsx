import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import Header from "../../Components/Header";
import { useGetCategoriesQuery } from "../../state/api";
import SkeletonPost from "../../Components/Loading/Skeleton/SkeletonPost";
import Cate from "./Cate.png";
import AddProductModal from "../../Components/AddProductModal";
import AddCategory from "../../Components/AddCategory";
import ConfirmDelete from "../../Components/ConfirmCategoryDelete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CatePic from "./CatePic";
import EditCategory from "../../Components/EditCategory";
const Category = ({ setSnackbar, id, name, image, addedBy, products }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <AddProductModal
        open={openEdit}
        handleOpen={handleOpenEdit}
        handleClose={handleCloseEdit}
      >
        <EditCategory id={id} onClose={handleCloseEdit} />
      </AddProductModal>
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[300]}
              gutterBottom
            >
              Added by: {addedBy}
            </Typography>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              See More
            </Button>
            <Button onClick={handleOpenEdit} variant="primary" size="small">
              Edit
            </Button>
            <ConfirmDelete setSnackbar={setSnackbar} id={id} />
          </CardActions>

          <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{
              color: theme.palette.neutral[100],
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Products:
              </Typography>
              {products.map((product) => (
                <Typography variant="h5" component="div">
                  {product.name} with id: {product._id}
                </Typography>
              ))}
            </CardContent>
          </Collapse>
        </Box>
        <Box sx={{ width: "40%", height: "100px" }} objectFit="contain">
          <img
            style={{
              width: "100%",
            }}
            src={`http://localhost:8080/${image}`}
            alt="Category"
          />
        </Box>
      </Card>
    </>
  );
};

const Categories = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const { data, isLoading } = useGetCategoriesQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(data);
  const [snackbar, setSnackbar] = React.useState(null);

  return (
    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <AddCategory onClose={handleClose} />
      </AddProductModal>
      <Header title="CATEGORIES" subtitle="List of categories" />
      {data === undefined && <p>Error</p>}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: "span 4",
            },
          }}
        >
          <Card
            sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          >
            <CatePic />
          </Card>
          {data.data.map(({ _id, name, addedBy, products, image }) => (
            <Category
              key={_id}
              id={_id}
              setSnackbar={setSnackbar}
              name={name}
              addedBy={addedBy}
              products={products}
              image={image}
            />
          ))}

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
        <>
          <SkeletonPost />
        </>
      )}
    </Box>
  );
};

export default Categories;
