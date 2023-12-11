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

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user_index = text_data_json["user_index"]
        message = text_data_json["message"]
        username = text_data_json["username"]
        print("receive")

        Chat.objects.create(user_index = user_index, username = username, message = message)

        chat_list = Chat.objects.all()

        json_chat_list = []

        for chat in chat_list:
            chat_data_json = chat.toJSON()
            json_chat_list.append(chat_data_json) 

        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "chat_message", "chatlist": list(json_chat_list)}
            )

    def disconnect(self, close_code):
        async_to_sync(
            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )
        )

    def chat_message(self, event):
        chatlist = event["chatlist"]
        print("send")
        self.send(text_data=json.dumps({"type": "chat", "chatlist": chatlist}))
