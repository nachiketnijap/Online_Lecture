import React from "react";
import { message } from "antd";
import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import "./Course.css";
const Course = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    level: "",
    description: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("course", image);

    await fetch("http://localhost:8080/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:8080/api/course/postCourse", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? message.success("Course added successfully")
            : message.error("Error while adding course");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Level</p>
          <input
            value={productDetails.level}
            onChange={changeHandler}
            type="text"
            name="level"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Description</p>
          <input
            value={productDetails.description}
            onChange={changeHandler}
            type="text"
            name="description"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        Add Product
      </button>
    </div>
  );
};

export default Course;
