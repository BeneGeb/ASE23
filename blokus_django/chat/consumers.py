from django.core.serializers import serialize
from django.http import JsonResponse
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
import jwt
from gameinterface.models import Player

JWT_SECRET = "r3FIem8T67NVumSmD7IrdrC042YTrPAugLZJsucI80GLH0mHWkHmahHZKhc3jON_cu5aHMaIRM3u04svAv11QQ"
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = "chat"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()
        chat_list = Chat.objects.all()
        json_chat_list = [
            {
                "pk": chat.message_id,
                "username": chat.username,
                "message": chat.message,
            }
            for chat in chat_list
        ]

        self.send(text_data=json.dumps({"type": "chat_message", "chatlist": json_chat_list}))

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        access_token = text_data_json["access_token"]
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=['HS256'])
        player = Player.objects.get(player_id=payload.get("id"))

        message = text_data_json["message"]
        username = player.player_name
        print("receive")

        message_id = Chat.objects.count()

        Chat.objects.create(message_id = message_id, username = username, message = message)

        chat_list = Chat.objects.all()

        json_chat_list = [
            {
                "pk": chat.message_id,
                "username": chat.username,
                "message": chat.message,
            }
            for chat in chat_list
        ]

        self.send(text_data=json.dumps({"type": "chat_message", "chatlist": json_chat_list}))

    def disconnect(self, close_code):
        async_to_sync(
            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )
        )


