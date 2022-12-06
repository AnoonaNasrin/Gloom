import React, { useEffect, useState } from "react";
import ChatListItems from "./ChatListItem";

import "./ChatList.css";
import { useNavigate } from "react-router-dom";

function ChatList(props) {

  const [allChatss, setAllChats] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    props.socket.on("recent-sent", (recent, factor) => {
      console.log(recent);
      setAllChats(recent);
      if (factor == 0) {
        props.socket.emit("chat-select", recent[0]._id);

        props.socket.emit(
          "connect-user",
          (recent[0]._id + user._id).split("").sort().join("")
        );
      }
    });

    props.socket.on("search-value", (users) => {
      setAllChats(users);
    });
  });

  useEffect(() => {
    props.socket.on("friend-list", (friend) => {
      const friendUnblock = friend.filter((e) => e.block == false)
      setAllChats(friendUnblock);
      console.log(friendUnblock);
    })
  }, [])

  return (
    <div className="main__chatlist">
      <button className="btn1" style={{ color: "white", background: "green", height: "40px", width: "180px" }}>
        <i onClick={() => { navigate("/friendlist/" + user._id) }} className="fa fa-plus"></i>
        <span>New conversation</span>
      </button>
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input
            type="text"
            placeholder="Search Here"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              props.socket.emit("search-friends", user._id, e.target.value);
            }}
            required
          />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {allChatss.map((item, index) => {
          console.log(item);
          return (
            <ChatListItems
              socket={props.socket}
              name={item.name}
              key={index}
              id={item._id}
              message={item.message}
              animationDelay={index + 1}
              active={item.active ? "active" : ""}
              isOnline={item.isOnline ? "active" : ""}
              image={item.avatar}
            />
          );
        })}
      </div>
    </div>
  );
}
export default ChatList;
