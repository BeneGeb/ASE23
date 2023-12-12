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

export const sendJoinedPlayer = () => {
  console.log("Joined Lobby");
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "joinLobby",
      access_token: localStorage.getItem("access_token"),
    })
  );
};

export const sendPlayerData = (player_name, color) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "updatePlayerSettings",
      access_token: localStorage.getItem("access_token"),
      player_name: player_name,
      color: color,
    })
  );
};

export const sendIfPlayerReady = (isReady) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "sendIfPlayerReady",
      access_token: localStorage.getItem("access_token"),
      isReady: isReady,
    })
  );
};

export const sendPlayerSurrender = () => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "sendPlayerSurrender",
      access_token: localStorage.getItem("access_token"),
    })
  );
};

export const playerJoinedLobby = (index) => {
  const color = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"];
  const player_name = "Player_" + index;
  sendJoinedPlayer(index, player_name, color[index]);
};

export const playerQuit = (player_id) => {
  wsSendMessage(
    JSON.stringify({
      type: "action",
      action: "playerQuit",
      player_id: player_id,
    })
  );
};
