import React from 'react'
import './landing.css'
import  url from '../../../images/logo.png';

const Landing = () => {
  return (
    <div className="landing">

        <div className='content'> <img src={url} alt="" /> <h1>Welcome to Chat.io <br></br> Start an instant one to one chat</h1></div>
      
    </div>
  )
}

export default Landing