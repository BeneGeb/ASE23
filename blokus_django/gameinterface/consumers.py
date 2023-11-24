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
                    self.startGame(json_data)
                elif action == "placeField":
                    self.placeField(json_data)
                elif action == "finishGame":
                    self.finishGame(json_data)
                else:
                    raise "Unsupported action"
        except Exception as e:
            print(f"Receiving Request failed {json_data}: {e}")
          

    def startGame(self, json_data):
        #Make Sure old Game data is deleted
        try:
            Game.objects.all().delete()
            Player.objects.all().delete()
            Square.objects.all().delete()

            game = Game.objects.create(game_id = 1, currPlayer_id = 1)
            Player.objects.create(player_id=1, game_id=game, color="red", isAI=False, isHuman=True)
            Player.objects.create(player_id=2, game_id=game, color="green", isAI=False, isHuman=True)
            Player.objects.create(player_id=3, game_id=game, color="blue", isAI=False, isHuman=True)
            Player.objects.create(player_id=4, game_id=game, color="yellow", isAI=False, isHuman=True)

            for i in range(400):
                Square.objects.create(square_id=i, game_id=game, value="")
        
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "startgame_response", "message": "started game successfully"}
            )
        except:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "startgame_response", "message": "starting game failed"}
            )

    def placeField(self, json_data):
        index_list = json_data["indexList"]
        color = json_data["color"]
        Square.objects.filter(game_id =1, square_id__in = index_list).update(value=color)

        values_list = Square.objects.values_list('value', flat=True)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "send_gamefield", "field": list(values_list)}
        )

    
        

    def finishGame(self, json_data):
        Game.objects.all().delete()
        Player.objects.all().delete()
        Square.objects.all().delete()

    def startgame_response(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"type": "startgame_response", "message": message}))

    def send_gamefield(self, event):
        field = event["field"]
        self.send(text_data=json.dumps({"type": "send_gamefield", "field": field}))

    #Soll ermöglichen sich zu reconnecten
    def get_gamestate(self,event):
        pass


    
           



