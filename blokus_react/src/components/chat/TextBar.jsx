import React, { Component, useState } from 'react'
import '../../styles/Chat/TextBar.css'

export default function TextBar ({ sendMessage }) {
  const [inputValue, setInputValue] = useState('')

  function onClickSend () {
    sendMessage(inputValue)
    setInputValue('')
  }

  function onInputChange(e){
    setInputValue(e.target.value)
  }

  return (
    <div className='textbar'>
      <input className='textbar-input' type='text' value={inputValue} onChange={onInputChange}/>
      <button className='textbar-send' onClick={onClickSend}>
        Send
      </button>
    </div>
  )
}
