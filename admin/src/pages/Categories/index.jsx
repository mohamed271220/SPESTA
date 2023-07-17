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

const Category = ({ id, name, image, addedBy, products }) => {
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
          <Avatar
            src={`http://localhost:8080/${image}`}
            sx={{ width: "100px", height: "100px" }}
          />
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
    </Card>
  );
};

const Categories = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetCategoriesQuery();
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
            "& > div": {
              gridColumn: "span 4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:'column'
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
            onClick={() => {}}
          >
            <CardContent
              sx={{
                display: "flex",
                borderRadius: "0.55rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img />
            </CardContent>
          </Card>
          {data.data.map(({ _id, name, addedBy, products }) => (
            <Category
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

export default Categories;
