import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/userService"

import "./Profile.css"


function Profile(props) {

  // we can use the useParams hook to access the  dynamic  pieces of the url // 
  let { userId } = useParams();

  const [searchText, setSearchText] = useState("");
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState({ name: "", email: "", number: "" })
  const [uses, setUses] = useState(null)
  const [friendBlock, setFriendBlock] = useState('')
  const [find, setFind] = useState('')

  const user = JSON.parse(localStorage.getItem("user"))

  const findBlocked = async (user, userId) => {
    const data = await UserService.findBlock(user, userId)
    console.log(data);
    if (data.status == true) {
      setFind(data.block)
    }
  }


  const friendsBlock = async (user, userId) => {
    const data = await UserService.friendBlock(user, userId)
    console.log(data);
    if (data.status == true) {
      setFriendBlock(data.block)
    }
  }

  const friendsToatal = async (userId) => {
    const data = await UserService.friendsCount(userId)
    console.log(data);
    if (data.status == true) {
      setFriends(data.friends)
      console.log(friends);
    }
  }

  const findUser = async (userId) => {
    const data = await UserService.findUserProfile(userId)
    console.log(data);
    if (data.status == true) {
      setUsers(data.user)
    }
  }

  useEffect(() => {

    if (friends.find((e) => e.user == user._id)) {
      setUses(friends.find((e) => e.status == "accepted" && e.user == user._id))
    } else {
      setUses(0);
    }
    console.log(uses);
    // const use = friends.find(elemant => elemant.user == user._id)
    // setUses(friends.find(elemant => elemant.user == user._id && elemant.status == "accepted"))
  }, [friends]);


  const sendFriendRequest = (e) => {
    props.socket.emit("friend-request", user._id, userId);
    setUses(null)
  };

  useEffect(() => {
    // props.socket.on("joined", (id) => {
    //   props.socket.emit("show-friends", id)
    //   console.log("ddtd");
    // })
    // props.socket.on("bondings",(users) => {
    //   console.log("fhfg"); 
    //   console.log(users);
    //    setFriends(users);
    // })
    friendsToatal(userId)
    findUser(userId)
  }, [])

  return (
    <div style={{ width: "100vw" }} className="main-content">
      {/* -- Top navbar - */}
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">
          {/* !-- Brand -- */}
          {/* <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">User profile</a> */}
          {/* -- Form -- */}
          {/* <form className="navbar-search navbar-search-dark frm-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div className="frm-group mb-0">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <input className="frm-control" placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  type="text" />
              </div>
            </div>
          </form> */}
          {/* -- User -- */}
          <ul className="navbar-nav align-items-center d-none d-md-flex">
            <li className="nav-item dropdown">
              <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div classNa-me="media align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" />
                  </span>
                  <div className="media-body ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">{users.name}</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <div className=" dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-single-02"></i>
                  <span>My profile</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-settings-gear-65"></i>
                  <span>Settings</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-calendar-grid-58"></i>
                  <span>Activity</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-support-16"></i>
                  <span>Support</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* -- Header -- */}
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" >
        {/* -- Mask - */}
        <span className="mask bg-gradient-default opacity-8"></span>
        {/* -- Header container -- */}
        <div className="container-fluid d-flex align-items-center">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">Hello Jesse</h1>
              <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
              <a href="#!" className="btn btn-info">Edit profile</a>
            </div>
          </div>
        </div>
      </div>
      {/* -- Page content - */}
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <img src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" className="rounded-circle" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {user._id != userId &&
                  <div className="d-flex justify-content-between">
                    {uses ? (
                      <>
                        <button id="btnsa" onClick={() => { friendsBlock(user._id, userId) }} className="btn btn-sm btn-info mr-4">Block</button>
                        <button id="btnsa" className="btn btn-sm btn-default float-right">Message</button>
                      </>
                    ) : (
                      <>
                        {uses == 0 ? (
                          <a onClick={sendFriendRequest} className="btn btn-sm btn-info mr-4">Connect</a>
                        ) : (
                          <a className="btn btn-sm btn-info mr-4" >  Already sent a request</a>
                        )}
                      </>
                    )}
                  </div>
                }
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">
                          {friends.length}
                        </span>
                        <span className="description">Friends</span>
                      </div>
                      {user._id == userId &&
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Blocked friends</span>
                        </div>
                      }
                      {/* <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="text-center">
                  <h3>
                    Jessica Jones<span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2"></i>Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2"></i>University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p></p>
                  <a href="#">Show more</a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">My account</h3>
                  </div>
                  {/* <div className="col-4 text-right">
                    <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-username">Name</label>
                          <input type="text" id="input-username" className="frm-control frm-control-alternative" placeholder={users.name} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="frm-group">
                          <label className="frm-control-label" htmlFor="input-email">Email </label>
                          <input type="email" id="input-email" className="frm-control frm-control-alternative" placeholder={users.email} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-first-name"> Mobile number </label>
                          <input type="text" id="input-first-name" className="frm-control frm-control-alternative" placeholder={users.number} readOnly={true} />
                        </div>
                      </div>
                      {/* <div className="col-lg-6">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-last-name">Last name</label>
                          <input type="text" id="input-last-name" className="frm-control frm-control-alternative" placeholder="Last name" value="Jesse" readOnly={true} />
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* -- Address -- */}
                  {/* <h6 className="heading-small text-muted mb-4">Contact information</h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-address">Address</label>
                          <input id="input-address" className="frm-control frm-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" readOnly={true} type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-city">City</label>
                          <input type="text" id="input-city" className="frm-control frm-control-alternative" placeholder="City" value="New York" readOnly={true} />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="frm-group focused">
                          <label className="frm-control-label" htmlFor="input-country">Country</label>
                          <input type="text" id="input-country" className="frm-control frm-control-alternative" placeholder="Country" value="United States" readOnly={true} />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="frm-group">
                          <label className="frm-control-label" htmlFor="input-country">Postal code</label>
                          <input type="number" id="input-postal-code" className="frm-control frm-control-alternative" placeholder="Postal code" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" /> */}
                  {/* -- Description --
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <div className="frm-group focused">
                      <label>About Me</label>
                      <textarea rows="4" className="frm-control frm-control-alternative" placeholder="A few words about you ..." value="hai" readOnly={true} />
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;