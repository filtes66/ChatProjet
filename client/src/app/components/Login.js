import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//import "./Styles/Login.css";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = (validationOptions) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
/*
  const initialValues = {
    username: "",
    password: "",
  };*/

  const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm({ mode: "onChange", username: "", password: "" });

    const onSubmit = formValue => {
      const { username, password } = formValue;
      setLoading(true);

      dispatch(login({ username, password }))
        .unwrap()
        .then(() => {
          navigate('/chat', {state:{username:username, room:room}})
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };

    if (isLoggedIn) {
      return <Navigate to="/chat" state={{username:username, room:room}} />;
    }

    return (
      <div className="login-wrapper">
        <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="username" {...register("username", validationOptions.firstname)} />
            <small className="text-danger">
              {errors?.username.message}
            </small>
            <input type="password" placeholder="password" {...register("password", validationOptions.password)} />
            <small className="text-danger">
              {errors?.password.message}
            </small>
            {loading && (
                <span className="spinner-border spinner-border-sm"></span>
            )}
            <input disabled={isSubmitting} type="submit" className="submit-button" value="Login" />
          </form>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
      </div>
    )
}

export default Login;