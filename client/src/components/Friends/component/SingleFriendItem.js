import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Friends.css";

export default function SingleFriendItem(props) {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));

  const [state, setState] = useState(null);

  useEffect(() => {

    // check wheather friends contain logined user id //
    if (props.friends.find((e) => e.user == user._id)) {
      // check wheather  logined user is is accepted //
      setState(props.friends.find((e) => e.status == "accepted" && e.user == user._id));
    } else {
      setState(0);
    }
  }, []);

  const sendFriendRequest = (e) => {
    props.socket.emit("friend-request", user._id, props.id);
    setState(null);
  };

  return (
    <div className="flex fr_container" style={{ marginTop: "1rem" }}>
      <div className="fr_img">
        <img
          onClick={(e) => {
            navigate("/profile/" + props.id)
          }}
          className=""
          src="https://randomuser.me/api/portraits/men/20.jpg"
          alt="user image"
        />
      </div>
      <div className="">
        <div className="fr_details">
          <span className="heading">{props.name}</span>
          <span className="message">{props.message}</span>
        </div>
        <div className="fr_action">
          {state ? (
            <button className="accept">You are already bonded.</button>
          ) : (
            <>
              {state == 0 ? (
                <button className="accept" onClick={sendFriendRequest}>
                  Send Request
                </button>
              ) : (
                <button className="accept">Already send a request.</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
