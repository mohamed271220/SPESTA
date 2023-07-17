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
import { useGetProductsQuery } from "../../state/api";
import SkeletonPost from "../../Components/Loading/Skeleton/SkeletonPost";
import AddP from "./AddP.png";
import AddProduct from "../../Components/AddProduct";
import Logo from "../../Components/Logo";
const Product = ({
  id,
  name,
  description,
  price,
  category,
  tag,
  sale,
  status,
  rating,
}) => {
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
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
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
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary[700] }}
          >
            id: {id}
          </Typography>
          {sale && (
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary[700] }}
            >
              {sale * 100} off
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary[700] }}
          >
            status: {status}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

//ADD PRODUCT FORM MODAL MODAL

const style = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flexWrap: "nowrap",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#141937",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

const AddProductModal = ({ handleClose, open }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          overflow: "scroll",
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Logo />
            <AddProduct onClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const Products = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <AddProductModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
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
              <img
                src={AddP}
                alt="add"
                style={{ width: "90%", height: "90%" }}
              />
            </CardContent>
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
                category={category}
                tag={tag}
                sale={sale}
                status={status}
                rating={rating}
              />
            )
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
