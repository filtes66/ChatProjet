import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useController, Controller, appendErrors } from "react-hook-form";
import "./Styles/Register.css";

import { signup } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message);

    const [successful, setSuccessful] = useState(false);
    const { register, handleSubmit, formState : { errors, isSubmitting} } = useForm( { mode : "onChange" });

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const onSubmit = formValue => { //return a promise ?
        console.log("data : ", data);
        const { username, email, password, reenter, conditions } = formValue;
  
        setSuccessful(false);

        dispatch(signup({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });

            }

    return (
        <div className="login-wrapper">
            <h1>Create account</h1>
            {!successful && (
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="First name" {...register("firstname", validationOptions.firstname)} />
                        <small className="text-danger">
                            {errors.firstname?.message}
                        </small>
                        <input type="text" placeholder="Last name" {...register("lastname", validationOptions.lastname)} />
                        <small className="text-danger">
                            {errors.lastname?.message}
                        </small>
                        <input type="text" placeholder="Username" {...register("username", validationOptions.username)} />
                        <small className="text-danger">
                            {errors.username?.message}
                        </small>
                        <input type="text" placeholder="Email" {...register("email", validationOptions.email)} />
                        <small className="text-danger">
                            {errors.email?.message}
                        </small>
                        <input type="password" placeholder="Password" {...register("password", validationOptions.password)} />
                        <small className="text-danger">
                            {errors.password?.message}
                        </small>
                        <input type="text" placeholer="Re-Enter" {...register("reenter", validationOptions.password)} />
                        <input disabled={isSubmitting} type="submit" className="submit-button" value="Sign Up" />

                </form>
                <div className="terms">
                    <input type="checkbox" placeholder="I agree to these Terms & Conditions" {...register("conditions", {})} />
                </div>
            </>
             )}
        
            {message && (
                <div className="form-group">
                    <div
                        className={
                        successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register;