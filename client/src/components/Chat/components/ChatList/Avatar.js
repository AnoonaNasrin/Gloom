import React from "react";
import { useNavigate } from "react-router-dom";



export default function Avatar(props) {
  const navigate = useNavigate()
  return (
    <div className="avatar" onClick={(e) => {
      navigate("/profile/"+props.userId)
    }}>
      <div className="avatar-img">
        <img src={props.image} alt="#" />
      </div>
      <span className={`isOnline ${props.isOnline}`}></span>
    </div>
  );
}
