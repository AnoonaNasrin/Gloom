import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SingleFriendItem from "./component/SingleFriendItem";

import "./Friends.css";

function Friends(props) {
  const [allChatss, setAllChats] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [friendRequests, setFriendRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const onAccept = (id) => {
    const list = friendRequests.filter((item) => item._id != id);
    setFriendRequests([...list]);
    props.socket.emit("on-accept", user._id, id);
  };

  const onDecline = (id) => {
    const list = friendRequests.filter((item) => item._id != id);
    setFriendRequests([...list]);
    props.socket.emit("on-decline", user._id, id);
  };


  useEffect(() => {
    if (props.socket) {
      props.socket.on("joined", (id) => {
        props.socket.emit("fetch-request", id);
      });
    }
    props.socket.on("request-send", (user) => {
      setFriendRequests([...friendRequests, user]);
    });
  }, []);

  useEffect(() => {
    props.socket.on("sent-user-request", (users) => {
      setFriendRequests([...users]);
    });
    props.socket.on("search-value", (users) => {
      setAllChats(users);
    });
  }, []);

  return (
    <Navbar>
      <div className="main__chatlist mc ">
        <div className="ch_f">
          <h1>Find your Bond</h1>
        </div>
        <div className="main_s_f">
          <div className="cs_f">
            <div className="chatList__search">
              <div className="search_wrap">
                <input
                  type="text"
                  placeholder="Search Here"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    props.socket.emit("search-user", e.target.value, user._id);
                  }}
                  required
                />
                <button className="search-btn">
                  <i style={{ color: "darkGreen" }} className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="chatlist__items">
              {allChatss.map((item, index) => {
                return (
                  <SingleFriendItem
                    id={item._id}
                    name={item.name}
                    message="sent a bond request"
                    key={index}
                    socket={props.socket}
                    friends={item.friends}
                    image={item.avatar}
                  />
                );
              })}
            </div>
          </div>
          <div className="f_r">
            <div className="f_r_box">
              <div className="">
                <div className="">
                  <h1 className="fr_heading">Friend Requests</h1>
                </div>
                {friendRequests.map((item, index) => {
                  return (
                    <div className="flex fr_container">
                      <div className="fr_img">
                        {item.avatar ? 
                        <img
                          className=""
                          src= {`http://localhost:4500/${item.avatar}`}
                        /> :
                        <img
                        className=""
                        src= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                        } 
                      </div>
                      <div className="">
                        <div className="fr_details">
                          <span className="heading">{item.name}</span>
                          <span className="message">Sent you a bond request</span>
                        </div>
                        <div className="fr_action">
                          <button
                            className="accept"
                            onClick={(e) => {
                              onAccept(item._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="decline"
                            onClick={(e) => {
                              onDecline(item._id);
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}


export default Friends