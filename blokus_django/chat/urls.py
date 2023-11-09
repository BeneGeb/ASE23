from django.urls import path
from .views import register, login, lobby

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path("", lobby)
]
