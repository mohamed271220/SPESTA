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

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

import "./AddProduct.css";
const AddProduct = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [showPWD, setShowPWD] = React.useState(false);
  const [addedPhotos, setAddedPhotos] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      descriptions: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      images: {
        value: [],
        isValid: false,
      },
      category: {
        value: [],
        isValid: false,
      },
      tag: {
        value: [],
        isValid: false,
      },
      sale: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const getCategoriesAndTags = async () => {
      try {
        const response = await axios.get("/category");
        const { data: categories } = response;
        const response2 = await axios.get("/tags");
        const { data: tags } = response2;
        setCategories(categories.data);
        setTags(tags.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategoriesAndTags();
  }, []);
  //   console.log(tags);
  //   console.log(categories);
  const token = useSelector((state) => state.auth.token);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/admin/auth/login`, {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
      console.log(response);
      setIsLoading(false);
      dispatch();
      // props.onCancel();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  function uploadPhoto(ev) {
    setIsLoading(true);

    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + token
        },
      })
      .then((response) => {
        // console.log(response);
        const { data: filenames } = response;
        // console.log(filenames);

        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setIsLoading(true);

    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
    setIsLoading(false);
  }
  function selectAsMain(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  }

  const [categoriesId, setCategoriesId] = React.useState([]);
  const [tagsId, setTagsId] = React.useState([]);

  const handleChange = (event) => {
    if (event.target.checked) {
      setCategoriesId((prevState) => [...prevState, event.target.id]);
    } else {
      setCategoriesId((prevState) =>
        prevState.filter((id) => id !== event.target.id)
      );
    }
  };
  const handleTagChange = (event) => {
    if (event.target.checked) {
      setTagsId((prevState) => [...prevState, event.target.id]);
    } else {
      setTagsId((prevState) =>
        prevState.filter((id) => id !== event.target.id)
      );
    }
  };
  console.log(categoriesId);
  console.log(tagsId);

  return (
    <div className="add-product-container">
      {isLoading && <TransitionsModal />}
      {error && <p className="errMsg">{error}</p>}
      <form className="login" onSubmit={formSubmitHandler}>
        <Input
          id="name"
          type="text"
          label="Product name"
          placeholder="Make it something catchy"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product name"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="price"
          type="number"
          label="Product cost"
          placeholder="In EGP"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product price"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="sale"
          type="number"
          label="Sale"
          placeholder="In percentage eg. 00.20 "
          validators={[VALIDATOR_REQUIRE()]}
          //   errorText="Please enter product price"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="text"
          label="Description"
          placeholder="The more the better"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter product description"
          element="textarea"
          onInput={inputHandler}
        />
        <div className="form-control__collection">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="form-control__uploader" key={link}>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/` + link}
                  alt=""
                />
                <button
                  onClick={(ev) => removePhoto(ev, link)}
                  className="btn-1 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>

                <button
                  onClick={(ev) => selectAsMain(ev, link)}
                  className="btn-2"
                >
                  {link === addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="btn-icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="btn-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          <label className="form-control__label">
            <input
              type="file"
              multiple
              name="file"
              readId=""
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Assign categories</FormLabel>
          <FormGroup>
            {categories &&
              categories.map((cat) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={cat._id}
                      //   checked={}
                      onChange={handleChange}
                      name={cat.name}
                    />
                  }
                  label={cat.name}
                />
              ))}
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Assign Tags</FormLabel>
          <FormGroup>
            {tags &&
              tags.map((cat) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={cat._id}
                      //   checked={}
                      onChange={handleTagChange}
                      name={cat.name}
                    />
                  }
                  label={cat.name}
                />
              ))}
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>

        <button
          type="submit"
          className="center button submit-btn"
          disabled={!formState.isValid}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
