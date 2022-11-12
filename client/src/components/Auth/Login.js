import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../services/authServices";

import { login } from "../../store/actions/auth";
import { useDispatch } from "react-redux";

import bgImg from "../../assets/images/gloom.jpg";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    const data = await dispatch(login(userData, navigate));
    if (data.status == false) {
      toast.error(data.message, { position: "top-center" });
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      console.log(data);
    }

    console.log(data);
  };
  return (
    <section className="App">
      <div className="register">
        <div className="col-1">
          <h2 className="h2login" style={{ color: "green" }}>
            GLOOM LOGIN
          </h2>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:!\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input
              type="text"
              placeholder="password"
              {...register("password", {
                required: { value: true, message: "Password is required " },
                minLength: {
                  value: 5,
                  message: "Password should 5 characters long ",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <p className="forget" style={{ opacity: ".6" }}>
              <span
                onClick={async () => {
                  const em = watch("email");
                  if (
                    em.length != 0 &&
                    em.match(
                      /^(([^<>()[\]\\.,;:!\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                  ) {
                    localStorage.setItem("email", em);
                    console.log("valid");

                    const datas = await AuthService.sendEmailOtp({ email: em });
                    if (datas.status == true) {
                      navigate("/otp");
                    } else {
                      toast.error(datas.message, { position: "top-center" });
                    }
                  } else {
                    toast.error("Enter a valid email", {
                      position: "top-center",
                    });
                  }
                }}
              >
                Forget password
              </span>
            </p>
            <button className="btn">Submit</button>
            <p className="forget" style={{ opacity: ".6" }}>
              Don't have an account ? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="Failed to load the image" />
        </div>
      </div>
    </section>
  );
};
export default Login;
