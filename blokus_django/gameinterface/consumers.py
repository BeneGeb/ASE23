import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *


class GameConsumer(WebsocketConsumer):


    def connect(self):
        self.room_group_name = "game"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()


    def disconnect(self, close_code):
        async_to_sync(
            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )
        )
        
    def receive(self, text_data):
        json_data = json.loads(text_data)
        try:
            if json_data["type"] == "action":
                action = json_data["action"]
                if action == "startGame":
                    self.startGame()
                elif action == "placeField":
                    self.placeField(json_data)
                elif action == "finishGame":
                    self.finishGame(json_data)
                elif action == "joinLobby":
                    self.joinLobby(json_data)
                elif action == "updatePlayerSettings":
                    self.updatePlayerSettings(json_data)
                elif action == "sendIfPlayerReady":
                    self.updateIsReadyStatus(json_data)
                else:
                    raise "Unsupported action"
        except Exception as e:
            print(f"Receiving Request failed {json_data}: {e}")
          
    #region Handle incoming Requests
    def startGame(self):
        try:
            #Delete old Data
            Game.objects.all().delete()
            Player.objects.all().delete()
            Square.objects.all().delete()

            game = Game.objects.create(game_id = 1, currPlayer_id = 0)

            Player.objects.create(player_id=0, game_id=game, color="red", isAI=False, isHuman=True)
            Player.objects.create(player_id=1, game_id=game, color="green", isAI=False, isHuman=True)
            Player.objects.create(player_id=2, game_id=game, color="blue", isAI=False, isHuman=True)
            Player.objects.create(player_id=4, game_id=game, color="yellow", isAI=False, isHuman=True)

            #Initialize all Square Fields
            empty_field = [] 
            for i in range(400):
                square = Square.objects.create(square_id=i, game_id=game, value="")
                empty_field.append(square.value)
        

            #Send empty generated Field to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_gamefield" ,"field": empty_field, "currPlayer":game.currPlayer_id}
            )

        except Exception as e:
            #Send Error Response to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "error","message": "starting game failed"}
            )
            print(e)


    def placeField(self, json_data):
        try:
            index_list = json_data["indexList"]
            color = json_data["color"]
            blockId = json_data["blockId"]
            Square.objects.filter(game_id =1, square_id__in = index_list).update(value=color)
            values_list = Square.objects.values_list('value', flat=True)

            game = Game.objects.filter(game_id=1)
            currPlayer_id = game.first().currPlayer_id
            newPlayer_id = (currPlayer_id + 1) % 4
            game.update(currPlayer_id =  newPlayer_id)

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_gamefield", "currPlayer": game.first().currPlayer_id,"field": list(values_list) }
            )
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_block_placed", "playerId": currPlayer_id,"blockId": blockId}
            )
            
        except Exception as e:
             #Send Error Response to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "error","message": "placing fields failed"}
            )
            print(e)

    def finishGame(self, json_data):
        Game.objects.all().delete()
        Player.objects.all().delete()
        Square.objects.all().delete()
    #endregion

    def joinLobby(self, json_data):
        player_id = json_data["player_id"]
        player_name = json_data["player_name"]
        color = json_data["color"]
        Lobby.objects.create(player_id=player_id, player_name=player_name, color=color, isReady=False)

        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_joinedPlayer", "player_id": player_id, "player_name": player_name, "color": color, "isReady": False}
            )

    def updatePlayerSettings(self, json_data):
        player_id = json_data["player_id"]
        player_name = json_data["player_name"]
        color = json_data["color"]

        player = Lobby.objects.get(player_id=player_id)

        player.player_name = player_name
        player.color = color
        player.save()
            
        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_playerData", "player_id": player_id, "player_name": player_name, "color": color}
            )
    
    def updateIsReadyStatus(self, json_data):
        player_id = json ["player_id"]
        isReady = json_data["isReady"]
        
        player = Lobby.objects.get(player_id=player_id)

        player.isReady = isReady
        player.save()
         # Check if all players are ready
        total_players = Lobby.objects.count()
        ready_players = Lobby.objects.filter(isReady=True).count()

        if total_players == ready_players:
            # All players are ready, perform action here
            # startGame aufrufen und die Informationen übergeben, welche für das Game benotigt werrden
            print("start game")

        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_ready_information" ,"player_id": player_id, "isReady": isReady}
            )
    
    #region Send Requests to client
    def error(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"type": "error", "message": message}))

    def send_gamefield(self, event):
        field = event["field"]
        currPlayer = event["currPlayer"]
        self.send(text_data=json.dumps({"type": "send_gamefield", "currPlayer": currPlayer, "field": field }))

    def send_block_placed(self, event):
        playerId = event["playerId"]
        blockId = event["blockId"]
        self.send(text_data=json.dumps({"type": "send_block_placed", "playerId":playerId, "blockId": blockId}))

    def send_playerData(self, event):
        player_id = event["player_id"]
        player_name = event["player_name"]
        color = event["color"]
        isReady = event["isReady"]
        self.send(text_data=json.dumps({"type": "send_joinedPlayer", "player_id": player_id, "player_name": player_name, "color": color, "isReady": isReady}))
    
    def send_playerData(self, event):
        player_id = event["player_id"]
        player_name = event["player_name"]
        color = event["color"]
        self.send(text_data=json.dumps({"type": "send_playerData" ,"player_id": player_id, "player_name": player_name, "color": color}))
    
    def send_readyInformation(self, event):
        player_id = event["player_id"]
        isReady = event["isReady"]
        self.send(text_data=json.dumps({"type": "send_readyInformation" ,"player_id": player_id, "isReady": isReady}))
    

    #Soll ermöglichen sich zu reconnecten
    def get_gamestate(self,event):
        pass

    #endregion


    
           



