import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./chatContent.css";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatContent(props) {
  const [open, setOpen] = React.useState(false);
  const [sOpen, sSetOpen] = React.useState(false);

  const sHandleClickOpen = () => {
    sSetOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sHandleClose = () => {
    sSetOpen(false);
  };

  const onAgree = (e) => {
    handleClose();
    props.socket.emit("video-agree", rId);
    navigate(`/video/${rId}`);
  };

  const onDegree = (e) => {
    handleClose()
    sHandleClose()
    props.socket.emit("desagree", user._id)
  };

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const sender = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({});

  const [chatRoom, setChatRoom] = useState("");

  const [chatList, setChatList] = useState([]);

  const [message, setMessage] = useState("");

  const [rId, setRId] = useState("");

  const key = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const videoButtonClick = (e) => {
    const roomId = uuidv4();
    props.socket.emit("create-room", roomId, user);
    sHandleClickOpen();
  };

  useEffect(() => {
    props.socket.on("agree-video", (id) => {
      sHandleClose();
      navigate(`/video/${id}`);
    });

    props.socket.on("user-detail", (user) => {
      setUser(user);
      props.socket.emit("get-messages", sender._id, user._id);
    });

    props.socket.on("change-user", (name) => {
      setChatRoom(name);
    });

    props.socket.on("chat-messages", (messages) => {
      setChatList([...messages]);
    });

    props.socket.on("create-video", (roomId, id) => {
      setRId(roomId);
      handleClickOpen();
    });

    props.socket.on("name", () => {
      sHandleClose()
      handleClose()
    })
  }, []);

  useEffect(() => {
    props.socket.on("create-message", (messages) => {
      setChatList([
        ...chatList,
        {
          key: key.current,
          type: "other",
          message: messages,
          image: "",
        },
      ]);
      key.current += 1;
      scrollToBottom();
    });
  });

  const onSendClick = () => {
    if (message != "") {
      props.socket.emit(
        "send-message",
        message,
        sender._id,
        user._id,
        chatRoom
      );
      setChatList([
        ...chatList,
        {
          key: key.current,
          type: "",
          message: message,
          image: "",
        },
      ]);
      key.current += 1;
      setMessage("");
      scrollToBottom();
    }
   };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image={user.avatar}
            />
            <p>{user.name}</p>
          </div>
        </div>

        <div className="blocks" style={{ display: "flex" }}>
          <div
            className="settings"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <svg
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              onClick={videoButtonClick}
            >
              <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
            </svg>
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div style={{}} className="content__body">
        <div className="chat__items">
          {chatList.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.message}
                image={itm.image}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={onSendClick}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Incoming Video calling"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDegree}>Decline</Button>
            <Button onClick={onAgree}>Accept</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={sOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={sHandleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Ongoing Video Call "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
             Ringing 
            </DialogContentText>
            <Button onClick={()=>{onDegree()}}>Decline</Button>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={sHandleClose}>Disagree</Button>
            <Button onClick={sHandleClose}>Agree</Button>
          </DialogActions> */}
        </Dialog>
      </div>
    </div>
  );
}
