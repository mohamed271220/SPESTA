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

const EditCategory = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  //   const [isError, setIsError] = React.useState(undefined);
  const [error, setError] = React.useState();
  const token = useSelector((state) => state.auth.token);
  // console.log(token);
  const userId = useSelector((state) => state.auth.userId);
  const [products, setProducts] = React.useState([]);
  const [productIds, setProductIds] = React.useState([]);
  const [cate, setCate] = React.useState();
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

  useEffect(() => {
    const getCategory = async () => {
      try{

        const response = await axios.get(`/category/${props.id}`);
        const { data } = response;
        // console.log(data.data);
        if(data){
          setCate(data.data);
          setProductIds(data.data.products);
        console.log(data.data);
      }
      setFormData({
        name: {
          value: data.data.name,
          isValid: true,
        },
        image: {
          value: data.data.image,
          isValid: true,
        },
        description:{
          value:data.data.description,
          isValid:true
        }
      });
    } catch (err) {console.log(err);}
    };
    getCategory();
  }, [props.id, setFormData]);

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
      const data = await axios.put(`/admin/dashboard/editCategory/${props.id}`, formData, {
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
  const theme = useTheme();
  return (
    <div className="add-product-container">
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      {
cate ? (
  <form
        style={{
          backgroundColor: theme.palette.primary[100],
        }}
        className="login"
        onSubmit={formSubmitHandler}
      >
        <Input
          id="name"
          type="text"
          label="Category name"
          placeholder="Make it something catchy"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product name"
          element="input"
          onInput={inputHandler}
          initialValue={cate.name}
          initialValid={true}
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
          initialValue={cate.description}
          initialValid={true}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
          initialValue={cate.image}
          initialValid={true}
        />

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel
            sx={{
              color: theme.palette.primary[900],
            }}
            component="legend"
          >
            Assign Products
          </FormLabel>
          <FormGroup
            sx={{
              color: theme.palette.primary[900],
            }}
          >
            {products &&
              products.map((cat) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: theme.palette.primary[900],
                        }}
                        id={cat._id}
                        checked={
                          productIds.find((prod) => prod === cat._id) ? true : false
                        }
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
              backgroundColor: theme.palette.grey[700],
              color: theme.palette.grey[400],
            },
          }}
          disabled={!formState.isValid}
        >
          Add Category
        </Button>
      </form>
) : (
  <TransitionsModal/>
)
      }
       

      <p className={error ? "errMsg" : ""}>{error}</p>
    </div>
  );
};

export default EditCategory;
