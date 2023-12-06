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

        game = Game.objects.filter(game_id=1)[0]

        if not game:
            game = Game.objects.create(game_id = 1, currPlayer_id = 0)

        player_list = Player.objects.all()

        if not player_list:
            player1= Player.objects.create(player_id=0, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player2= Player.objects.create(player_id=1, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player3= Player.objects.create(player_id=2, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player4= Player.objects.create(player_id=3, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)

            player_list = [player1, player2, player3, player4]

        for player in player_list:
            if player.player_id == player_id:
                player.player_name = player_name
                player.color = color
                player.isHuman = True
                player.isAI = False
                player.save()
                break 

        player = Player.objects.filter(player_id=player_id)[0]

        json_player_list = []

        for player in player_list:
            player_data_json = player.toJSON()
            json_player_list.append(player_data_json)

        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_joinedPlayer", "playerList": list(json_player_list)}
            )

    def updatePlayerSettings(self, json_data):
        player_id = json_data["player_id"]
        player_name = json_data["player_name"]
        color = json_data["color"]

        player = Player.objects.get(player_id=player_id)

        player.player_name = player_name
        player.color = color
        player.save()
            
        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_playerData", "player_id": player_id, "player_name": player_name, "color": color}
            )
    
    def updateIsReadyStatus(self, json_data):
        player_id = json_data["player_id"]
        isReady = json_data["isReady"]
        player = Player.objects.get(player_id=player_id)

        player.isReady = isReady
        player.save()
         # Check if all players are ready
        total_players = Player.objects.count()
        ready_players = Player.objects.filter(isReady=True).count()

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

    def send_joinedPlayer(self, event):
        player_list =  event["playerList"]

        self.send(text_data=json.dumps({"type": "send_joinedPlayer", "player_list": player_list}))
    
    def send_playerData(self, event):
        player_id = event["player_id"]
        player_name = event["player_name"]
        color = event["color"]
        self.send(text_data=json.dumps({"type": "send_playerData" ,"player_id": player_id, "player_name": player_name, "color": color}))
    
    def send_ready_information(self, event):
        player_id = event["player_id"]
        isReady = event["isReady"]
        self.send(text_data=json.dumps({"type": "send_ready_information" ,"player_id": player_id, "isReady": isReady}))
    

    #Soll ermöglichen sich zu reconnecten
    def get_gamestate(self,event):
        pass

    #endregion


    
           



