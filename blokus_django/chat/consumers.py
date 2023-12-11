from django.core.serializers import serialize
from django.http import JsonResponse
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *


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

        message = text_data_json["message"]
        username = text_data_json["username"]
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


