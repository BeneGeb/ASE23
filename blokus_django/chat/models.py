from django.db import models

class Chat(models.Model):
    user_index = models.AutoField(primary_key=True)
    username = models.CharField(max_length= 15)
    message = models.CharField(max_length = 100)
