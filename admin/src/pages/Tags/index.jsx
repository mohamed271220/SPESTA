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
import AddProductModal from "../../Components/AddProductModal";
const Tag = ({ id, name, products, addedBy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
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
  );
};

const Tags = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetTagsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(data);

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
            <CardContent
              sx={{
                display: "flex",
                borderRadius: "0.55rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <img
                src={AddP}
                alt="add"
                style={{ width: "90%", height: "90%" }}
              /> */}
            </CardContent>
          </Card>
          {data.data.map(({ _id, name, products, addedBy }) => (
            <Tag
              key={_id}
              id={_id}
              name={name}
              addedBy={addedBy}
              products={products}
            />
          ))}
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
