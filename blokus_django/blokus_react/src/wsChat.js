export let send
let onMessageCallback

// This exported function is used to initialize the websocket connection
export const startWebsocketConnection = () => {
    let url = "ws://127.0.0.1:8000/ws/socket-server/"
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
    send = ws.send.bind(ws)
}

// This function is called by our React application to register a callback
// that needs to be called everytime a new message is received
export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn
}