import React, { useState } from "react";
import { useEffect } from "react";
import "./profile.css"
import { getUser } from "../../../api/UserRequests";
const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div className="conversation__body" >
          {online && <div className="online-dot"></div>}
          <img
            src="https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg"
            alt="Profile"
            className="followerImage"
          />
          <div  style={{fontSize: '0.8rem'}} className="followeruser" >
            <h4>{userData?.firstname} {userData?.lastname}</h4>
            <h5 style={{color: online ? "#51e200": "#a7b5a0"}}>{online? "Online" : "Offline"}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
