import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../services/userService";
import Navbar from "../../Navbar/Navbar";
import "./FriendList.css"

function FriendsListing(props) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  let { userId } = useParams()

  const [searchText, setSearchText] = useState("");
  const [friend, setFriend] = useState([])
  const [block, setBlock] = useState("")
  const [search, setSearch] = useState([])

  const friendBlock = async (userId, friendId) => {
    const data = await UserService.friendBlock(userId, friendId)
    console.log(userId, friendId);
    if (data.status == true) {
      setBlock(data.block)
      props.socket.emit("search-friends", user._id, "")
      console.log(block);
    }
  }

  const friendList = async (userId) => {
    const data = await UserService.friendList(userId)
    if (data.status == true) {
      //  const friendBond = friend.find(bond => bond.name , bond.avatar) //
      setFriend(data.friends)
      console.log(data.friends);
      console.log(friend);
    }
  }

  useEffect(() => {
    friendList(user._id)
    props.socket.on("friend-list", (friend) => {
      setSearch(friend);
      console.log(friend);
    })
  }, [])

  return (
    <Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="people-nearby">
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
                    <i style={{ color: "darkGreen" }} className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="nearby-user">
                <div className="">
                  {search.map((item, index) => {
                    console.log(item);
                    return (
                      <div className="col-md-2 col-sm-2 flex" style={{ alignItems: "center", justifyContent: "center", margin: "15px" }} >
                        {item.avatar ?
                          <img className="rounded-circle" style={{ width: "50px", height: "50px" }} src={`http://localhost:4500/${item.avatar}`} />
                          : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{ width: "50px", height: "50px" }} className="rounded-circle" />
                        }
                        <div className="col-md-7 col-sm-7 flex">
                          <div>
                            <h5><a style={{ marginLeft: "15px", fontSize: "18px", color: "green" }} href="#" className="profile-link">{item.name}</a></h5>
                          </div>
                          {/* <div className="col-md-3 col-sm-3"> */}
                          <div style={{ display: "flex", padding: "1px" }}>
                            {!item.block ? (
                              <button onClick={() => { friendBlock(user._id, item._id) }} className="btn btn-primary pull-right" style={{ height: "35px", width: "145px", background: "green" }}>Block</button>
                            ) : (
                              <button onClick={() => { friendBlock(user._id, item._id) }} className="btn btn-primary pull-right" style={{ height: "35px", width: "145px", background: "green" }}>Unblock</button>
                            )}

                            <button onClick={() => {
                              props.socket.emit("request-recent", user._id, 1);
                              props.socket.emit("chat-select", item._id);
                              console.log(item._id);
                              props.socket.emit(
                                "connect-user",
                                (user._id + item._id).split("").sort().join("")
                              );
                              navigate('/chat')
                            }}
                              className="btn btn-primary pull-right" style={{ height: "35px", width: "145px", background: "green" }}>message</button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar6.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Emma Johnson</a></h5>
                  <p>Model at Fashion</p>
                  <p className="text-muted">800m away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div> */}
              {/* <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar5.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Nora Wilson</a></h5>
                  <p>Writer at Newspaper</p>
                  <p className="text-muted">2.5km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div>
            <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar4.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Diana Amber</a></h5>
                  <p>Student</p>
                  <p className="text-muted">700m away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div>
            <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar3.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" clasNames="profile-link">Addison Thomas</a></h5>
                  <p>Barber at Fashion</p>
                  <p className="text-muted">1.5km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div>
            <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar2.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Jonathon Thompson</a></h5>
                  <p>Fashion Designer</p>
                  <p className="text-muted">2km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div>
            <div class="nearby-user">
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar7.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Olivia Steward</a></h5>
                  <p>Creative Director</p>
                  <p className="text-muted">2km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div> */}
              {/* <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar6.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Elena Foster</a></h5>
                  <p>Executive Officer</p>
                  <p className="text-muted">4km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div> */}
              {/* <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar1.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Brian Walton</a></h5>
                  <p>Designer at Designer</p>
                  <p className="text-muted">3km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div> */}
              {/* <div className="nearby-user">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <img src={"https://bootdey.com/img/Content/avatar/avatar7.png"} alt="user" className="profile-photo-lg" />
                </div>
                <div className="col-md-7 col-sm-7">
                  <h5><a href="#" className="profile-link">Cris Haris</a></h5>
                  <p>General Manager at Manager</p>
                  <p className="text-muted">1km away</p>
                </div>
                <div className="col-md-3 col-sm-3">
                  <button className="btn btn-primary pull-right">Add Friend</button>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
export default FriendsListing;