import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from users.models import User
import jwt

JWT_SECRET = "r3FIem8T67NVumSmD7IrdrC042YTrPAugLZJsucI80GLH0mHWkHmahHZKhc3jON_cu5aHMaIRM3u04svAv11QQ"

color = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"];
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
                elif action == "playerQuit":
                    self.deletePlayer(json_data)
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
        
        access_token = json_data["access_token"]
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])    
        player_id = payload.get("id")  

        user = User.objects.filter(id=player_id).first()

        game = Game.objects.all()[0]

        if not game:
            Player.objects.all().delete()
            game = Game.objects.create(game_id = 1, currPlayer_id = 0)
        

        player_list = Player.objects.all()

        if not player_list:
            player1= Player.objects.create(player_index=0, player_id=None, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player2= Player.objects.create(player_index=1, player_id=None, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player3= Player.objects.create(player_index=2, player_id=None, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)
            player4= Player.objects.create(player_index=3, player_id=None, game_id=game, player_name="-", color="gray", isAI=True, isHuman=False, isReady=False)

            player_list = [player1, player2, player3, player4]


        for index, player in enumerate(player_list):
            if player.player_id == None or player.player_id == user.id:
                player.player_name = user.name
                player.player_id = user.id
                player.color = color[index]
                player.isHuman = True
                player.isAI = False
                player.save()
                break 

        json_player_list = []

        for player in player_list:
            player_data_json = player.toJSON()
            json_player_list.append(player_data_json) 

        # client_index = 1

        # async_to_sync(self.send(text_data=json.dumps({"type": "send_client_index", "index": client_index})))
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
        
    def deletePlayer (self, json_data):
        player_id = json_data["player_id"]
        player = Player.objects.get(player_id=player_id)

        player.player_name = "-"
        player.color = "gray"
        player.isAI = True
        player.isHuman = False
        player.isReady = False
        player.save()
            
        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_playerData", "player_id": player_id, "player_name": "-", "color": "gray"}
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
    
    def send_client_index(self, event):
        index = event["index"]
        
        self.send(text_data=json.dumps({"type": "send_ready_information" ,"index": index}))

    #Soll ermöglichen sich zu reconnecten
    def get_gamestate(self,event):
        pass

    #endregion


    
           



