import React, { useEffect } from "react";
import Avatar from "./Avatar";
import { v4 as uuid4 } from "uuid";

export default function ChatListItem(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document
      .getElementsByClassName("chatlist__item")[0]
      .classList.add("active");
  });

  const SelectChat = (e) => {
    props.socket.emit("chat-select", props.id);
    props.socket.emit(
      "connect-user",
      (props.id + user._id).split("").sort().join("")
    );
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={SelectChat}
      className={`chatlist__item ${props.active ? props.active : ""}`}
    >
      <Avatar
        image={props.image ? props.image : ""}
        isOnline={props.isOnline}
        userId={props.id}
      />
      <div className="userMeta">
        <p>{props.name}</p>
        <h6 className="chat_item_msg">{props.message}</h6>
      </div>
    </div>
  );
}
