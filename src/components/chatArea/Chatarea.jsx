import React from 'react'
import './chatarea.css'
import Messages from './messages/Messages'
import Input from './input/Input'
import Chatareaheader from './header/chatareaheader'
import Landing from './landingComponent/Landing'

const Chatarea = (props) => {
  return (
    <>
    {!props.selected[0] && <> <div className="chatarea"><Landing></Landing></div></>}
    { props.selected[0] &&
  <div className="chatarea">
  <Chatareaheader></Chatareaheader>
  <div className="chatareacontainer" id="chatcontainer">


  <Messages></Messages>
  </div>
  <Input></Input>

  
  </div>}
  </>
  )
}

export default Chatarea