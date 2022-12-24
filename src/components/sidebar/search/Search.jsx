import React from "react";
import "./search.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import Chat from "../chats/Chat";
import { AuthContext } from "../../../context/Authcontext";
import { useContext } from "react";


const Search = (props) => {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");
  const { currentUser } = useContext(AuthContext);
  
  const handlechange = (e) => {
  
   
    props.hooks[1]([]);
 
    setValue(e.target.value);
    
  };
  useEffect( ()=> {
   const gosearch= async() => {
    try {
       
        const endstr =
          value.slice(0, -1) +
          String.fromCharCode(value.charCodeAt(value.length - 1) + 1);
  
        const q = query(
          collection(db, "users"),
          where("displayName", ">=", value),
          where("displayName", "<", endstr)
        
        );
  
        let querySnapshot = await getDocs(q);

        let resultData = querySnapshot.docs.filter(e=>{
          return e.data().uid !== currentUser.uid;
        })

        //debugger;
  
        setResult(resultData.map((e) => {
          return { ...e.data() };
        }));
        if (value.length===0) {
            props.hooks[1](props.hooks[0]);
            return ;
        }
       
        
  
  }
  catch (err) {
   

  }
} 
gosearch();
} ,[value,props.hooks,currentUser.uid])
  
  
  const listsearches=result.map((obj)=>  <Chat selected={props.selected} data={obj} hooks={[setValue,setResult,props.hooks[0],props.hooks[1]]} key={obj.photoURL}></Chat>);
 

  
  

  return (
    <>
    <div className="wrapsearch">
    <div className="search">
      <span>
        <AiOutlineSearch className="searchicon"></AiOutlineSearch>
      </span>

      <input type="text"  value={value} placeholder="Search a user " onChange={handlechange} />
    </div>
    </div>
{<div className="chatscontainer">{listsearches}</div>}
    </>
  );
};

export default Search;
