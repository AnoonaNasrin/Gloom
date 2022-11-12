import React, { useEffect } from "react";
import Avatar from "../ChatList/Avatar";

export default function ChatItem(props) {
  return (
    <div
      style={{ animationDelay: props.animationDelay }}
      className={`chat__item ${props.user ? props.user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <Avatar isOnline="active" image={props.image} />
    </div>
  );
}
