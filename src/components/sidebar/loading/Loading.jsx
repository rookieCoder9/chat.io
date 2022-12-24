import React from 'react'
import "./loading.css"
import LoadingIcons from 'react-loading-icons'
const Loading = () => {
  return (
   <div className="loading">
    <LoadingIcons.TailSpin stroke="#54656f"></LoadingIcons.TailSpin>
    <h1>Loading Chats</h1>
   </div>
  )
}

export default Loading