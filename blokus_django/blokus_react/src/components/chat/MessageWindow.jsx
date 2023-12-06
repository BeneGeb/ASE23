import React from 'react'
import '../../styles/Chat/MessageWindow.css'


const Message = ({ text, username}) => (
  <div className={'message'}>
    <div className='message-username'>{username}</div>
    <div className='message-text'>{text}</div>
  </div>
)

export default function MessageWindow ({ messages = [], username }) {  
    return (
      <div className='message-window'>
        {messages.map((msg, i) => {
          return <Message key={i} text={msg} username={"Bene"}/>
        })}
      </div>
    )
 }
