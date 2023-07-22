import React, { useEffect, useRef, useState } from "react";
// import {BsCloudUploadFill} from 'react-icons/bs'
// import Button from "./Button";
import "./ImageUpload.css";
import { Button, useTheme } from "@mui/material";
import upload from "./upload.png";
import UploadPic from "./UploadPic";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickFile = event.target.files[0];
      setFile(pickFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
const theme= useTheme()
  return (
    <div className="form-control-auth">
      <input
        type="file"
        name="image"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <UploadPic  onClick={pickImageHandler}  />
          )}
        </div>
        <Button
          sx={{
            color:theme.palette.primary[900],
            "&:hover": {
              color:  theme.palette.primary[700],
            },
          }}
          className="btn-small"
          type="button"
          onClick={pickImageHandler}
        >
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p style={{color:theme.palette.secondary[300]}} >{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
