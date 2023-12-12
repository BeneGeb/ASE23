import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from users.models import User
from chat.models import Chat
import jwt

JWT_SECRET = "r3FIem8T67NVumSmD7IrdrC042YTrPAugLZJsucI80GLH0mHWkHmahHZKhc3jON_cu5aHMaIRM3u04svAv11QQ"

color = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"]


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

    def debug(self, message):
        # Player.objects.all().update(isReady=True, hasSurrendered=False)
        Player.objects.all().delete()
        # self.startGame()

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
                elif action == "checkIfStartGame":
                    self.startReadyStatus()
                elif action == "sendIfPlayerReady":
                    self.updateIsReadyStatus(json_data)
                elif action == "playerQuit":
                    self.deletePlayer(json_data)
                elif action == "sendPlayerSurrender":
                    self.playerSurrender(json_data)
                elif action == "debug":
                    self.debug(json_data)
                else:
                    raise "Unsupported action"
        except Exception as e:
            print(f"Receiving Request failed {json_data}: {e}")

    # region Handle incoming Requests

    def startGame(self):
        try:
            # Delete old Data
            Square.objects.all().delete()

            game = Game.objects.filter(game_id=1)[0]
            # Initialize all Square Fields
            empty_field = []
            for i in range(400):
                square = Square.objects.create(
                    square_id=i, game_id=game, value="")
                empty_field.append(square.value)

            player_list = [{'color': player.color, 'player_id': player.player_index, 'player_name': player.player_name} for player in Player.objects.all()]

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "send_start_game", "redirect": True}
            )
            # Send empty generated Field to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "send_gamefield", "field": empty_field, "currPlayer": game.currPlayer_id, "playerList": player_list }
            )

        except Exception as e:
            # Send Error Response to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "error",
                                       "message": "starting game failed"}
            )
            print(e)

    def placeField(self, json_data):
        try:
            index_list = json_data["indexList"] #Liste mit allen Indizes auf denen ein Blokc platziert wird
            color = json_data["color"]
            blockId = json_data["blockId"]

            Square.objects.filter(
                game_id=1, square_id__in=index_list).update(value=color)
            values_list = Square.objects.values_list('value', flat=True)

            game = Game.objects.filter(game_id=1)
            currPlayer_id = game.first().currPlayer_id
            newPlayer_id = (currPlayer_id + 1) % 4
            for i in range(4):
                if Player.objects.filter(player_index=newPlayer_id).first().hasSurrendered:
                    newPlayer_id = (newPlayer_id + 1) % 4
                else:
                    break

            #Abfrage ob newPlayer eine KI ist
            #Funktion die KI aufruft, rückgabe ist eine indexliste
            game.update(currPlayer_id=newPlayer_id)

            player_list = [{'color': player.color, 'player_id': player.player_index, 'player_name': player.player_name} for player in Player.objects.all()]

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_gamefield", "currPlayer": game.first(
                ).currPlayer_id, "field": list(values_list), "playerList": player_list}
            )
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "send_block_placed", "playerId": currPlayer_id, "blockId": blockId}
            )

        except Exception as e:
            # Send Error Response to Clients
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "error",
                                       "message": "placing fields failed"}
            )
            print(e)

    # endregion

    def joinLobby(self, json_data):

        access_token = json_data["access_token"]
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])
        player_id = payload.get("id")

        user = User.objects.filter(id=player_id).first()

        game = Game.objects.all().first()

        if not game:
            Player.objects.all().delete()
            game = Game.objects.create(game_id=1, currPlayer_id=0)

        player_list = Player.objects.all()

        if not player_list:
            player1 = Player.objects.create(player_index=0, player_id=None, game_id=game,
                                            player_name="-", color="gray", isAI=True, isHuman=False, isReady=False, hasSurrendered=False)
            player2 = Player.objects.create(player_index=1, player_id=None, game_id=game,
                                            player_name="-", color="gray", isAI=True, isHuman=False, isReady=False, hasSurrendered=False)
            player3 = Player.objects.create(player_index=2, player_id=None, game_id=game,
                                            player_name="-", color="gray", isAI=True, isHuman=False, isReady=False, hasSurrendered=False)
            player4 = Player.objects.create(player_index=3, player_id=None, game_id=game,
                                            player_name="-", color="gray", isAI=True, isHuman=False, isReady=False, hasSurrendered=False)

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

        async_to_sync(self.send(text_data=json.dumps(
            {"type": "send_player_id", "player_id": user.id})))
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                "type": "send_joinedPlayer", "playerList": list(json_player_list)}
        )

    def updatePlayerSettings(self, json_data):
        access_token = json_data["access_token"]
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])
        player_id = payload.get("id")

        player_name = json_data["player_name"]
        color = json_data["color"]

        player = Player.objects.get(player_id=player_id)

        player.player_name = player_name
        player.color = color
        player.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "send_playerData",
                                   "player_id": player_id, "player_name": player_name, "color": color}
        )
    
    def startReadyStatus(self):

        ready_players = Player.objects.filter(isReady=True).count()
        human_players = Player.objects.filter(isHuman=1).count()

        if ready_players == human_players:
            self.startGame()
        else:
            human_players = Player.objects.filter(isHuman=0)
            json_player_list = []
            for player in human_players:
                player_data_json = player.toJSON()
                json_player_list.append(player_data_json)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "send_missing_players", "unchecked_players": list(json_player_list)}
            )

    def updateIsReadyStatus(self, json_data):
        access_token = json_data["access_token"]
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])
        player_id = payload.get("id")

        isReady = json_data["isReady"]
        player = Player.objects.get(player_id=player_id)

        player.isReady = isReady
        player.save()
        # Check if all players are ready
        total_players = Player.objects.count()
        ready_players = Player.objects.filter(isReady=True).count()

        if not total_players == ready_players:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "send_ready_information", "player_id": player_id, "isReady": isReady}
            )
        else:
            self.startGame()

    def deletePlayer(self, json_data):
        player_index = json_data["player_index"]
        player = Player.objects.get(player_index=player_index)
        filtered_players = Player.objects.filter(isHuman=1)

        player_list = Player.objects.all()


        if player_index != 3:
            for i in range (player_index, len(filtered_players)):
                    print(i)
                    player = Player.objects.get(player_index=i)
                    player.player_index = i
                    player.player_id = player_list[i+1].player_id
                    player.color = player_list[i+1].color
                    player.player_name = player_list[i+1].player_name
                    player.isAI  = player_list[i+1].isAI
                    player.isHuman = player_list[i+1].isHuman
                    player.isReady = player_list[i+1].isReady
                    player.save()

        player = Player.objects.get(player_index=len(filtered_players)-1)
        player.player_id = None
        player.player_name = "-"
        player.color = "gray"
        player.isAI = True
        player.isHuman = False  
        player.isReady = False
        player.save()
        

        json_player_list = []

        player_list = Player.objects.all()

        for player in player_list:
            player_data_json = player.toJSON()
            json_player_list.append(player_data_json)
        
        if len(Player.objects.filter(isHuman=0)) == 4:
            Game.objects.all().delete()
            Player.objects.all().delete()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                "type": "send_joinedPlayer", "playerList": list(json_player_list)}
        )


        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name, {"type": "send_playerData",
        #                            "player_id": player_id, "player_name": "-", "color": "gray"}
        # )

    # region Send Requests to client

    def playerSurrender(self, json_data):
        access_token = json_data["access_token"]
        #player = Player.objects.get(player_id=player_id)
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])
        game = Game.objects.get(game_id=1)
        #player_id = payload.get("id")
        

        player_id = game.currPlayer_id
        player = Player.objects.get(player_index=player_id)

        player.hasSurrendered = True
        player.save()
        
        player_surrendered = Player.objects.filter(hasSurrendered=True).count()
        if  player_surrendered == 4:    
            Square.objects.all().delete()   
            Game.objects.all().delete()
            Player.objects.all().delete()
            Chat.objects.all().delete()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "send_end_game"}
            )
            async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)
            return 

    
        if player.player_index == game.currPlayer_id:
            newPlayer_id = (game.currPlayer_id + 1) % 4
            while Player.objects.filter(player_index=newPlayer_id).first().hasSurrendered:
                newPlayer_id = (newPlayer_id + 1) % 4
            
        game.currPlayer_id = newPlayer_id
        game.save()

      
        values_list = Square.objects.values_list('value', flat=True)
        player_list = [{'color': player.color, 'player_id': player.player_index, 'player_name': player.player_name} for player in Player.objects.all()]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "send_gamefield", "currPlayer": game.currPlayer_id, "field": list(values_list), "playerList": player_list}
        )

    def error(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"type": "error", "message": message}))

    def send_gamefield(self, event):
        field = event["field"]
        currPlayer = event["currPlayer"]
        playerList = event["playerList"]
        self.send(text_data=json.dumps(
            {"type": "send_gamefield", "currPlayer": currPlayer, "field": field,  "playerList": playerList}))

    def send_block_placed(self, event):
        playerId = event["playerId"]
        blockId = event["blockId"]
        self.send(text_data=json.dumps(
            {"type": "send_block_placed", "playerId": playerId, "blockId": blockId}))

    def send_joinedPlayer(self, event):
        player_list = event["playerList"]

        self.send(text_data=json.dumps(
            {"type": "send_joinedPlayer", "player_list": player_list}))

    def send_playerData(self, event):
        player_id = event["player_id"]
        player_name = event["player_name"]
        color = event["color"]
        self.send(text_data=json.dumps(
            {"type": "send_playerData", "player_id": player_id, "player_name": player_name, "color": color}))
    
    def send_missing_players(self, event):
        player_list = event["player_list"]
        self.send(text_data=json.dumps(
        {"type": "send_missing_players", "player_list": player_list}))
        

    def send_ready_information(self, event):
        player_id = event["player_id"]
        isReady = event["isReady"]
        self.send(text_data=json.dumps(
            {"type": "send_ready_information", "player_id": player_id, "isReady": isReady}))

    def send_player_id(self, event):
        player_id = event["index"]

        self.send(text_data=json.dumps(
            {"type": "send_player_id", "player_id": player_id}))

    def send_start_game(self, event):
        redirect = event["redirect"]

        self.send(text_data=json.dumps(
            {"type": "send_start_game", "redirect": redirect}))
        
    def send_end_game(self, event):
        self.send(text_data=json.dumps(
            {"type": "send_end_game"}))

    # Soll ermöglichen sich zu reconnecten
    def get_gamestate(self, event):
        pass

    # endregion
