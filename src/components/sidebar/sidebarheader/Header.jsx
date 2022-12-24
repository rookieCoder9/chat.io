import React from 'react'
import './header.css'
import {useContext} from 'react'
import { AuthContext } from "../../../context/Authcontext"
import {BiLogOut} from 'react-icons/bi'
import {signOut} from "firebase/auth"
import {auth} from '../../../firebase'
let url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJaDn7Vmy8w0uaXt5Zma1tWcPZfXpvSA8Kd8B-qILghPJLnrEFnshHFmsZqv3mjIrYVw&usqp=CAU"

const Header = () => {
    const {currentUser}= useContext(AuthContext);

  return (

   <div className="header">
  <div><h1>Chats</h1></div>  
  <div className="profilegrp">
  <img src={currentUser.photoURL} alt="" />
            <h3>
            {currentUser.displayName}</h3>
            <BiLogOut className='logoutIcon' onClick={()=> signOut(auth)} style={{width:"22px",height:"22px"}}></BiLogOut>

  </div>

   </div>
  )
}

export default Header