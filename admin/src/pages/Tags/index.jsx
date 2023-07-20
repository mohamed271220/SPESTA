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
import Header from "../../Components/Header";
import { useGetProductsQuery, useGetTagsQuery } from "../../state/api";
import SkeletonPost from "../../Components/Loading/Skeleton/SkeletonPost";
// import AddP from "./AddP.png";
import AddTag from "../../Components/AddTag";
import Logo from "../../Components/Logo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ConfirmDelete from "../../Components/ConfirmCategoryDelete";
import EditTag from "../../Components/EditTag";
import AddProductModal from "../../Components/AddProductModal";
import TagP from './Tag.png'
import TagPic from "./TagPic";

const Tag = ({ setSnackbar, id, name, products, addedBy }) => {
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
        <EditTag id={id} onClose={handleCloseEdit} />
      </AddProductModal>
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
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
        <ConfirmDelete tagMode={true} setSnackbar={setSnackbar}  id={id} />

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
          <Typography variant="h4">added by: {addedBy}</Typography>
          <Typography variant="h5" component="div">Products:</Typography>
          {products.map((product) => (
              <Typography variant="h5" component="div">
                {product.name} with id: {product._id}
              </Typography>
            ))}
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
};

const Tags = () => {
  const theme = useTheme();
  const [snackbar, setSnackbar] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);
  const { data, isLoading } = useGetTagsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  // console.log(data);

  return (
  

    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <AddTag onClose={handleClose} />
      </AddProductModal>
      <Header title="PRODUCTS" subtitle="List of products details" />
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
            "& > div": { gridColumn:  "span 4" },
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
          <TagPic/>
          </Card>
          {data.data.map(({ _id, name, products, addedBy }) => (
            <Tag
              key={_id}
              id={_id}
              name={name}
              addedBy={addedBy}
              products={products}
              setSnackbar={setSnackbar}
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

export default Tags;
