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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../Components/Header";
import { useGetProductsQuery } from "../../state/api";
import SkeletonPost from "../../Components/Loading/Skeleton/SkeletonPost";

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

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
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
