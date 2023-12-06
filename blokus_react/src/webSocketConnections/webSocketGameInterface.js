let onMessageCallback;
let wsSendMessage;

export const startWebsocketGameConnection = () => {
  const windowUrl = window.location.hostname;

  //const ipAddress = windowUrl.split("//")[1].split(":")[0];
  let url = "ws://" + windowUrl + ":8000/ws/game/";
  //let url = "ws://127.0.0.1:8000/ws/game/";
  const ws = new window.WebSocket(url) || {};

  ws.onopen = () => {
    console.log("opened Websocket Game connection");
  };

  ws.onclose = (e) => {
    console.log("close Websocket Game connection: ", e.code, e.reason);
  };

  ws.onmessage = (e) => {
    onMessageCallback(e.data);
  };

  wsSendMessage = ws.send.bind(ws);
};

export const registerOnGameMessageCallback = (callBackFunction) => {
  onMessageCallback = callBackFunction;
};

export const sendPlacedBlock = (indexList, color, blockId) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "placeField",
      indexList: indexList,
      color: color,
      blockId: blockId,
    })
  );
};

export const startGame = () => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "startGame",
    })
  );
};

export const registerOnLobbyMessageCallback = (callBackFunction) => {
  onMessageCallback = callBackFunction;
};

export const sendJoinedPlayer = (player_id, player_name, color) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "joinLobby",
      player_id: player_id,
      player_name: player_name,
      color: color,
    })
  );
};

export const sendPlayerData = (player_id, player_name, color) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "updatePlayerSettings",
      player_id: player_id,
      player_name: player_name,
      color: color,
    })
  );
};

export const sendIfPlayerReady = (player_id, isReady) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "sendIfPlayerReady",
      player_id: player_id,
      isReady: isReady,
    })
  );
};
