import React from 'react'
import '../../styles/Chat/MessageWindow.css'


const Message = ({ text, username}) => (
  <div className={'message'}>
    <div className='message-username'>{username}</div>
    <div className='message-text'>{text}</div>
  </div>
)

export default function MessageWindow ({ chatJson = { chatlist: [] }}) {
    console.log(chatJson.chatlist);
    return (
      <div className='message-window'>
      {chatJson.chatlist.map((msgJson, index) => (
        <Message key={index} text={msgJson.message} username={msgJson.username} />
        ))}
      </div>
    )
 }
