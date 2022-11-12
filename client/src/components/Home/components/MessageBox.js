import React from "react";

import './MessageBox.css'

const MessageBox = (props) => {
    return(
        <div className="message-box">
        <div className="message-avatar">
            <img src={props.avatar} className="message-img" alt="Image failed load." />
        </div>
        <div className="message-content">
            <h2 className="message-heading">{props.heading}</h2>
            <p className="message-message">{props.message}</p>
        </div>
    </div>
    )
}
export default MessageBox ;