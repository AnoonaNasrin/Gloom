import React, { useEffect, useRef } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Notfound from "./components/Error/404";
import OtpScreen from "./components/Auth/OtpScreen";
import ForgetPassword from "./components/Auth/Forget";
import Friends from "./components/Friends/Friends";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import FriendsListing from "./components/Profile/component/FriendsList";
import VideoScreen from "./components/Chat/components/Video/Video"
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import io from "socket.io-client";
import Navbar from "./components/Navbar/Navbar";

function App() {

  const socket = io("http://localhost:4500");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on("connect", () => {
      if (user) {
        console.log("excuse me");
        socket.emit("join", user._id);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        {/* <Route exact path='/' element={<ProtectedRoute element={Chat} />} /> */}
        {/* <ProtectedRoute exact path='/' element={Chat} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/friends" element={<Friends socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route
          path="/video/:roomId"
          element={<VideoScreen socket={socket} />}
        />
        <Route path="/profile/:userId" element={<Profile socket={socket} />} />
        <Route path="/friendlist" element={<FriendsListing/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
