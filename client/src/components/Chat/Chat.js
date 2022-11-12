import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import ChatContent from "./components/ChatContent/ChatContent";
import "./Chat.css";

const Chat = (props) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (props.socket) {
      props.socket.on("joined", (id) => {
        props.socket.emit("request-recent", user._id);
      });
    }
  });

  // const user = useSelector((state) => state.authReducer.user);
  return (
    <div>
      <Navbar>
        <div id="main__chatbody">
          <ChatList socket={props.socket} />
          <ChatContent socket={props.socket} />
        </div>
      </Navbar>
    </div>
  );
};
export default Chat;
