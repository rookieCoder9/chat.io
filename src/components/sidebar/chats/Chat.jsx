import React from "react";
import "./chat.css";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../../context/Authcontext";
import { ChatContext } from "../../../context/Chatcontext";
let url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJaDn7Vmy8w0uaXt5Zma1tWcPZfXpvSA8Kd8B-qILghPJLnrEFnshHFmsZqv3mjIrYVw&usqp=CAU";

const Chat = (props) => {
  let messageToDisplay= props.msg!==undefined? props.msg.text :"Tap Here To Chat";
  if (messageToDisplay.length>18) {
    messageToDisplay=messageToDisplay.substring(0,17)+"...."
  }
 
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const user = props.data;
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if (props.selected[0]===false) {
      props.selected[1](true);
    }
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      
    } catch (err) {console.log(err);}
    dispatch({ type: "CHANGE_USER", payload: props.data });
    if (props.hooks){
    props.hooks[0]("");
    props.hooks[1]([]);
    props.hooks[3](props.hooks[2]);
    }
    var objDiv = document.getElementById("chatcontainer");
    objDiv.scrollTop = objDiv.scrollHeight;
    
    
    
  };

  return (
    <div 
className="chat"      onClick={handleSelect}>
      <img src={props.data.photoURL ? props.data.photoURL : url} alt="" />

      <div className="container">
        <h3>{props.data.displayName ? props.data.displayName : "John"}</h3>
        <span style={{overflow:"hidden"}}>
          {messageToDisplay}
        </span>
      </div>
    </div>
  );
};

export default Chat;
