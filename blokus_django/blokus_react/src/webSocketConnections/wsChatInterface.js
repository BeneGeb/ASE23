let onMessageCallback
let wsSendMessage

export const startWebsocketChatConnection = () => {
    let url = "ws://127.0.0.1:8000/ws/chat/"
    const ws = new window.WebSocket(url) || {}
   
    ws.onopen = () => {
        console.log('opened Websocket Chat connection')
    }

    ws.onclose = (e) => {
        console.log('close Websocket Chat connection: ', e.code, e.reason)
    }

    ws.onmessage = (e) => {
        onMessageCallback(e.data)
    }

    wsSendMessage = ws.send.bind(ws)
}


export const registerOnMessageCallback = (callBackFunction) => {
  onMessageCallback = callBackFunction;
}

export const sendChatMessage = (message, username) => {
    wsSendMessage(JSON.stringify({
        'message': message,
        'username': username,
    }))
}