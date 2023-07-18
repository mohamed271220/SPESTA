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
const Category = ({ id, name, image, addedBy, products }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  console.log(image);

  return (
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
            color={theme.palette.secondary[700]}
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
          <Button variant="primary" size="small">
            Edit
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
            <Typography variant="h5" component="div">
              Products:
            </Typography>
            {products.map((product) => (
              <Typography variant="h5" component="div">
                {product}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Box>
      <Box
        sx={{ width: "40%", height: "100px" }}
        objectFit="contain"
      >
        <img
       
          src={`http://localhost:8080/${image}`}
          
          alt="Category"
        />
      </Box>
    </Card>
  );
};

const Categories = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetCategoriesQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <AddCategory onClose={handleClose} />
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
            "& > div": {
              gridColumn: "span 4",
            },
          }}
        >
          <Card
            sx={{
              backgroundImage: "none",
              backgroundColor: "#909090",
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
              <img src={Cate} alt="Categories" height="200px" width="200px" />
            </CardContent>
          </Card>
          {data.data.map(({ _id, name, addedBy, products, image }) => (
            <Category
              key={_id}
              id={_id}
              name={name}
              addedBy={addedBy}
              products={products}
              image={image}
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

export default Categories;
