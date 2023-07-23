import React, { useContext, useEffect } from "react";
import Input from "./Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TransitionsModal from "./LoadingModal";
import ImageUpload from "../pages/auth/ImageUpload";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography, useTheme } from "@mui/material";

const AddCategory = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  //   const [isError, setIsError] = React.useState(undefined);
  const theme=useTheme()
  const [error, setError] = React.useState();
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const userId = useSelector((state) => state.auth.userId);
  const [products, setProducts] = React.useState([]);
  const [productIds, setProductIds] = React.useState([]);

  // console.log(error);
  const [formState, inputHandler, setFormData] = useForm(
    {
   

      image: {
        value: null,
      },
      name: {
        value: "",
        isValid: false,
      },
      description:{
        value:"",
        isValid:false
      }
    },
    false
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`/admin/dashboard/products`);
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
    console.log(products);
  }, []);

  const handleChange = (event) => {
    if (event.target.checked) {
      setProductIds((prevState) => [...prevState, event.target.id]);
    } else {
      setProductIds((prevState) =>
        prevState.filter((id) => id !== event.target.id)
      );
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("productIds", JSON.stringify(productIds));
      formData.append("description", formState.inputs.description.value);
      console.log(formData.entries());
      const data = await axios.post(`/admin/dashboard/addCategory`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setIsLoading(false);

      props.onClose();
      // props.onCancel();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="add-product-container">
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      <form className="login" style={{
        backgroundColor: theme.palette.primary[100]
      }}  onSubmit={formSubmitHandler}>
        <Input
          id="name"
          type="text"
          label="Category name"
          placeholder="Make it something catchy"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product name"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="text"
          label="Category description"
          placeholder="Make it something catchy"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product description"
          element="textarea"
          onInput={inputHandler}
        />

        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        />

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend"  
          sx={{
            color:theme.palette.primary[900]
          }}
          >Assign Products</FormLabel>
          <FormGroup sx={{
            color:theme.palette.primary[900]
          }}>
            {products &&
              products.map((cat) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                      sx={{
            color:theme.palette.primary[900]
          }}
                        id={cat._id}
                        //   checked={}
                        onChange={handleChange}
                        name={cat.name}
                      />
                    }
                    label={cat.name}
                  />
                  <Typography variant="body2">{cat._id}</Typography>
                </>
              ))}
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          className="submit-btn"
          sx={{
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "larger",
          
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary[200],
            "&:hover": {
              color: theme.palette.secondary[100],
              backgroundColor: theme.palette.secondary[400],
            },
            "&:disabled": {
              backgroundColor:theme.palette.grey[700],
              color: theme.palette.grey[400],
            }
          }}
            disabled={!formState.isValid}
        >
          Add Category
        </Button>
      </form>

      <p className={error ? "errMsg" : ""}>{error}</p>
    </div>
  );
};

export default AddCategory;
