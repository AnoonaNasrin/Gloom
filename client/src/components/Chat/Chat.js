import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import ChatContent from "./components/ChatContent/ChatContent";
import "./Chat.css";
import { useNavigate } from "react-router-dom";

const Chat = (props) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const [state, setState] = useState(true)

  useEffect(() => {
    if (props.socket) {
      props.socket.on("joined", (id) => {
        props.socket.emit("request-recent", user._id, 0);
      });
    }
  });

  useEffect(() => {
    const reload = localStorage.getItem("reload")
    if(reload == "true") {
      window.location.reload(true)
      localStorage.setItem("reload" ,"false")
    }
  }, [])


  useEffect(() => {
    if (user) {
      navigate('/chat')
    } else {
      navigate('/login')
    }
  }, [])

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
