"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const inputRef = useRef();

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No images Picked Yet</p>
          ) : (
            <Image src={pickedImage} alt="Image selected by User" fill />
          )}
        </div>
        <input
          className={classes.input}
          required
          multiple
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <button className={classes.button} onClick={handleClick} type="button">
          {" "}
          Pick an Image
        </button>
      </div>
    </div>
  );
}
