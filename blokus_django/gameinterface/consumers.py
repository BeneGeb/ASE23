import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


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
        text_data_json = json.loads(text_data)
        message = text_data_json["team"]
        print("team: ", message)

