import React from "react";
import Navbar from "../../Navbar/Navbar";
import "./FriendList.css"

function FriendsListing() {

  return (
    <Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="people-nearby">
              <div className="nearby-user">
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img src={"https://bootdey.com/img/Content/avatar/avatar7.png"} alt="user" className="profile-photo-lg" />
                  </div>
                  <div className="col-md-7 col-sm-7">
                    <h5><a href="#" className="profile-link">Sophia Page</a></h5>

                    {/* <div className="col-md-3 col-sm-3"> */}
                    <button className="btn btn-primary pull-right">Block</button>
                    {/* <button className="btn btn-primary pull-right"></button> */}
                    {/* </div> */}
                  </div>
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