import React from 'react'
import './chatareaheader.css'
import {AiOutlineVideoCameraAdd} from 'react-icons/ai'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {IoMdContact} from 'react-icons/io'
import {ChatContext} from '../../../context/Chatcontext'
import  {useContext} from 'react'
let url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJaDn7Vmy8w0uaXt5Zma1tWcPZfXpvSA8Kd8B-qILghPJLnrEFnshHFmsZqv3mjIrYVw&usqp=CAU"

const Chatareaheader = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="header">
  <h1>{data.user.displayName ? data.user.displayName:"..."}</h1>
  {/* <div className="profilegrp">
 
<AiOutlineVideoCameraAdd></AiOutlineVideoCameraAdd>
<IoMdContact></IoMdContact>
<BsThreeDotsVertical></BsThreeDotsVertical>
  </div> */}

   </div>
  )
}

export default Chatareaheader