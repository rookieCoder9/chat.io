import './sidebar.css'
import Header from './sidebarheader/Header'
import Chat from './chats/Chat'
import Search from './search/Search'
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import Loading from './loading/Loading';

import { db } from "../../firebase";
const Sidebar = (props) => {
    const [chats, setChats] = useState([]);
   const [chatList,setChatList]= useState([]);
    const { currentUser } = useContext(AuthContext);
   const [loading,setLoading]=useState(true);

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());

           
            setChatList(doc.data());
            setLoading(false);
          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser.uid && getChats();
      }, [currentUser.uid]);


  return (
    <div className="sidebar">
     
<Header></Header>
<div className="searchcontainer">

<Search selected={props.selected} hooks={[chatList,setChats]}></Search>
</div>

<div className="chatscontainer"> 
{loading &&  <Loading></Loading>}

{chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => <Chat selected={props.selected} msg={chat[1].lastMessage} data={chat[1].userInfo} key={chat[1].userInfo.photoURL}> </Chat>)}





</div>




    </div>
  )
}

export default Sidebar