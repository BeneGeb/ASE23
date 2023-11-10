"""
ASGI config for blokus_django project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from chat.consumers import ChatConsumer
from gameinterface.consumers import GameConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blokus_django.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(URLRouter([
                path("ws/chat/", ChatConsumer.as_asgi()),
                path("ws/game/", GameConsumer.as_asgi()),
            ])),


    }
)
