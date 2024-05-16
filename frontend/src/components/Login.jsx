import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        values
      );

      if (res.data.success) {
        message.success("Login Successfully");
        console.log("success");
        navigate("/adminDashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };
  return (
    <>
      <div className="form-container w-25 mx-auto">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/" className="m-2">
            Not a user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
