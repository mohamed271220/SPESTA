import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  Backdrop,
  Modal,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ProductPic from "./ProductPic";
import Header from "../../Components/Header";
import { useGetProductsQuery } from "../../state/api";
import SkeletonPost from "../../Components/Loading/Skeleton/SkeletonPost";
import AddP from "./AddP.png";
import AddProduct from "../../Components/AddProduct";
import Logo from "../../Components/Logo";
import ConfirmDelete from "../../Components/ConfirmCategoryDelete";

import AddProductModal from "../../Components/AddProductModal";
import EditProduct from "../../Components/EditProduct";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Product = ({
  id,
  name,
  description,
  price,
  setSnackbar,
  category,
  tag,
  sale,
  status,
  rating,
}) => {
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
        <EditProduct id={id} onClose={handleCloseEdit} />
      </AddProductModal>

      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          {category.map((cate) => (
            <Typography
              sx={{ fontSize: 14 }}
              color={theme.palette.secondary[300]}
              gutterBottom
            >
              {cate.name} : {cate._id}
            </Typography>
          ))}
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            sx={{ mb: "1.5rem" }}
            color={theme.palette.secondary[400]}
          >
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />

          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexWrap: "wrap",
            
          }}
        >
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
          <Button variant="primary" size="small" onClick={handleOpenEdit}>
            Edit
          </Button>
          <ConfirmDelete productMode={true} setSnackbar={setSnackbar} id={id} />
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary[200] }}
            >
              id: {id}
            </Typography>
            {sale && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary[300] }}
              >
                {sale * 100} off
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary[400] }}
            >
              status: {status}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

const Products = () => {
  const theme = useTheme();
  const [snackbar, setSnackbar] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1024px)");
  console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <AddProduct onClose={handleClose} />
      </AddProductModal>
      <Header title="PRODUCTS" subtitle="List of products details" />
      {data === undefined && <p>Error</p>}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent={isNonMobile ? "space-between" : "center"}
          alignItems={!isNonMobile && "center"}
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
            {/* <CardContent
            
            > */}
             <ProductPic   sx={{
                display: "flex",
                borderRadius: "0.55rem",
                alignItems: "center",
                justifyContent: "center",
              }}/>
            {/* </CardContent> */}
          </Card>
          {data.products.map(
            ({
              _id,
              name,
              description,
              price,
              category,
              tag,
              sale,
              status,
              rating,
            }) => (
              <Product
                key={_id}
                id={_id}
                name={name}
                description={description}
                price={price}
                setSnackbar={setSnackbar}
                category={category}
                tag={tag}
                sale={sale}
                status={status}
                rating={rating}
              />
            )
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
      ) : (
        <>
          <SkeletonPost />
        </>
      )}
    </Box>
  );
};

export default Products;
