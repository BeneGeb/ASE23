import React, { Component } from 'react'
// The CSS can be viewed at https://github.com/sohamkamani/react-chat-example/blob/master/src/TextBar.css
import '../../styles/TextBar.css'

export default class TextBar extends Component {
  constructor (props) {
    super(props)
    // Initialize a new ref to hold the input element
    this.input = React.createRef()
  }

  // The sendMessage method is called anytime the enter key is
  // pressed, or if the "Send" button is clicked
  sendMessage () {
    this.props.onSend && this.props.onSend(this.input.current.value)
    this.input.current.value = ''
  }

  // This method is assigned as the event listener to keypress events
  // if the key turns out to be the enter key, send the message by
  // calling the `sendMessage` method
  sendMessageIfEnter (e) {
    if (e.keyCode === 13) {
      this.sendMessage()
    }
  }
  render () {
    // Create functions by binding the methods to the instance
    const sendMessage = this.sendMessage.bind(this)
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)

    // The textbar consists of the input form element, and the send button
    // The `sendMessageIfEnter` function is assigned as the event listener
    // to keydown events for the text input
    // The `sendMessage` function is assigned as the listener for the click
    // event on the Send button
    return (
      <div className='textbar'>
        <input className='textbar-input' type='text' ref={this.input} onKeyDown={sendMessageIfEnter} />
        <button className='textbar-send' onClick={sendMessage}>
          Send
        </button>
      </div>
    )
  }
}