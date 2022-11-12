import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import bgImg from "../../assets/images/gloom.jpg";
import MessageBox from "./components/MessageBox";

import "./Home.css";
const Home = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar>
        <MessageBox avatar={bgImg} heading="fhftydgh" message="hfhtuh" />
      </Navbar>
    </div>
  );
};
export default Home;
