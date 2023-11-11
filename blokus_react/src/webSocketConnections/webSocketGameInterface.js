let onMessageCallback
let wsSendMessage

export const startWebsocketGameConnection = () => {
    let url = "ws://127.0.0.1:8000/ws/game/"
    const ws = new window.WebSocket(url) || {}
   
    ws.onopen = () => {
        console.log('opened Websocket Game connection')
    }

    ws.onclose = (e) => {
        console.log('close Websocket Game connection: ', e.code, e.reason)
    }

    ws.onmessage = (e) => {
        onMessageCallback(e.data)
    }

    wsSendMessage = ws.send.bind(ws)
}


export const registerOnMessageCallback = (callBackFunction) => {
  onMessageCallback = callBackFunction
}

export const sendPlacedBlock = (team) => {
    wsSendMessage(JSON.stringify({
        'team': team ,
    }))
}