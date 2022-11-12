import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import bgImg from "../../assets/images/gloom.jpg";
import AuthService from "../../services/authServices";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registers } from "../../store/actions/auth";

function OtpScreen() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (userData) => {
    try {
      const email = localStorage.getItem("email");
      if (email) {
        const otpemail =
          userData.first + userData.second + userData.third + userData.fourth;
        const data = await AuthService.verifyEmail({
          otp: otpemail,
          email: email,
        });
        if (data.status) {
          navigate("/forget");
        } else {
          toast.error(data.message, { position: "top-center" });
        }
      } else {
        const number = localStorage.getItem("number");
        const otp =
          userData.first + userData.second + userData.third + userData.fourth;
        const data = await AuthService.otpVerify({ otp: otp, number: number });
        localStorage.removeItem("number");
        console.log(data);
        if (data.status) {
          const userData = localStorage.getItem("user");
          const data = await dispatch(
            registers(JSON.parse(userData), navigate)
          );
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          toast.error(data.message, { position: "top-center" });
        }
      }
    } catch (er) {
      console.log(er.message);
    }
  };
  return (
    <section className="App">
      <di className="register">
        <div className="col-1">
          <h2 className="otp" style={{ color: "green" }}>
            {" "}
            GLOOM OTP SCREEN
          </h2>
          <form
            id="frm"
            className="otpInput"
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <input
                type="text"
                style={{
                  maxHeight: "70px",
                  maxWidth: "70px",
                  padding: "5px",
                  marginRight: "6px",
                  fontSize: "40px",
                }}
                {...register("first")}
              />
              <input
                type="text"
                style={{
                  maxHeight: "70px",
                  maxWidth: "70px",
                  padding: "5px",
                  marginRight: "6px",
                  fontSize: "40px",
                }}
                {...register("second")}
              />
              <input
                type="text"
                style={{
                  maxHeight: "70px",
                  maxWidth: "70px",
                  padding: "5px",
                  marginRight: "6px",
                  fontSize: "40px",
                }}
                {...register("third")}
              />
              <input
                type="text"
                style={{
                  maxHeight: "70px",
                  maxWidth: "70px",
                  padding: "5px",
                  marginRight: "6px",
                  fontSize: "40px",
                }}
                {...register("fourth")}
              />
            </div>
            <button className="btns">Submit</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="Failed to load the image" />
        </div>
      </di>
    </section>
  );
}

export default OtpScreen;
