import React from "react";
import { useNavigate } from "react-router-dom";



export default function Avatar(props) {
  const navigate = useNavigate()
  return (
    <div className="avatar" onClick={(e) => {
      navigate("/profile/" + props.userId)
    }}>
      <div className="avatar-img">
        {props.image ?
          <img className="rounded-circle" style={{ width: "50px", height: "50px" }} src={`http://localhost:4500/${props.image}`} alt="#" />
          : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{ width: "50px", height: "50px" }} className="rounded-circle" />
        }
      </div>
      <span className={`isOnline ${props.isOnline}`}></span>
    </div>
  );
}

