import React from "react";
import "./input.css";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../../context/Chatcontext";
import { AuthContext } from "../../../context/Authcontext";
import { IoIosSend } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";

import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import Loading from "../../sidebar/loading/Loading";
const Input = () => {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text==="") {return }
    document.getElementById("inputcontainer").value="";
   
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="inputmsg">
      <div className="inputcontainer" >
        <input id="inputcontainer"
        onKeyDown={(e)=>{ if (e.key==="Enter") handleSend()}}
          type="text"
          placeholder="Type message"
          onChange={(e) => setText(e.target.value)}
       
        />
        <div className="icongrp">
          <IoIosSend  onClick={handleSend}></IoIosSend>
        </div>
      </div>
    </div>
  );
};

export default Input;
