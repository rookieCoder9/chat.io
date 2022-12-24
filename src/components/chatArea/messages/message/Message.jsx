import React from "react";
import "./message.css";
import { useContext } from "react";
import { ChatContext } from "../../../../context/Chatcontext";
import { AuthContext } from "../../../../context/Authcontext";
import { useRef, useEffect } from "react";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  

  useEffect(() => {
    
    var objDiv = document.getElementById("chatcontainer");
objDiv.scrollTop = objDiv.scrollHeight;
  }, [message]);
  return (
    <div
      className={`message ${
        message.senderId === currentUser.uid
          ? "messagesender"
          : "messagereceiver"
      }`}
    >
      <div className="messageinfo">
        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
     
      </div>

      <div
        className={`message ${
          message.senderId === currentUser.uid
            ? "messagecontent-sender"
            : "messagecontent-receiver"
        }`}
      >
        <div className="spancontent">
        <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
