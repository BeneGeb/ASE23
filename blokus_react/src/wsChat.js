export let sendChatMessage;
let onMessageCallback

export const startWebsocketChatConnection = () => {
    let url = "ws://127.0.0.1:8000/ws/chat/"
    const ws = new window.WebSocket(url) || {}
   
    ws.onopen = () => {
        console.log('opened ws connection')
    }

    ws.onclose = (e) => {
        console.log('close ws connection: ', e.code, e.reason)
    }

    ws.onmessage = (e) => {
        onMessageCallback(e.data)
    }

    sendChatMessage = ws.send.bind(ws)
}


export const registerOnMessageCallback = (callBackFunction) => {
  onMessageCallback = callBackFunction
}