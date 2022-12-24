import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Chatarea from '../../components/chatArea/Chatarea'
import { useState } from 'react'
import './home.css'
const Home = () => {
  const [isChat,setIsChat]=useState(false)
  return (
    <div className="home">
<Sidebar selected={[isChat,setIsChat]}></Sidebar>

<Chatarea selected={[isChat,setIsChat]}></Chatarea>


    </div>
  )
}

export default Home