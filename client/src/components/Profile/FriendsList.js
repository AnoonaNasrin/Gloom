import React from "react";


export default function FriendsListing() {
    return (
         <div className="main__chatlist mc ">
            <div className="ch_f">
               <h1> Friends List </h1>
            </div>
            <div>
                <button  style={{color:"white" , background:"red" , border:"none" }}>Block</button>
                <button>Unblock</button>
            </div>
        </div>
    )
}