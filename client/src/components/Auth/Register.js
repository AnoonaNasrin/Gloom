import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registers } from "../../store/actions/auth";
import AuthService from "../../services/authServices";
import { toast } from "react-toastify";
import "./Auth.css";
import bgImg from "../../assets/images/gloom.jpg";

function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (userData) => {
    const data = await AuthService.checkError(userData);

    if (data.status == true) {
      try {
        localStorage.setItem("number", userData.number);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.removeItem("email");
        navigate("/otp");
        await AuthService.otpSend({ number: userData.number });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  };

  //     try {
  //         const data = await AuthService.register(userData)
  //         if (data.status == true) {
  //             localStorage.setItem("number", userData.number)
  //             const datas = await AuthService.otpSend({ number: userData.number })
  //             if (datas.status) {
  //                 navigate('/otp')
  //             } else {
  //                 console.log(datas)
  //             }
  //         } else {
  //             console.log(data);
  //         }

  //     } catch (e) {
  //         console.log(e);
  //     }
  // }

  return (
    <section className="App">
      <div className="register">
        <div className="col-1">
          <h2 style={{ color: "green" }}> GLOOM REGISTER</h2>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="name"
              {...register("name", {
                required: { value: true, message: "Name  is required" },
                minLength: { value: 4, message: "name must contain 4 letters" },
              })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <input
              type="text"
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "Email is required " },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:!\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "enter a valid email",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password should have 5 characters",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <input
              type="text"
              placeholder="confirm password"
              {...register("confirm", {
                required: "Password is required",
                validate: (value) =>
                  value === password.current || "Password do not match",
              })}
            />
            {errors.confirm && (
              <p className="error">{errors.confirm.message}</p>
            )}
            <input
              type="number"
              placeholder="number"
              {...register("number", {
                required: "Number is required",
                minLength: { value: 10, message: " Enter a valid number" },
                maxLength: { value: 10, message: " Enter a valid number" },
              })}
            />
            {errors.number && <p className="error">{errors.number.message}</p>}
            <button className="btn">Submit</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="Failed to load the image" />
        </div>
      </div>
    </section>
  );
}
export default Register;
