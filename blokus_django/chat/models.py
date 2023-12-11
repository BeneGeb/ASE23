from django.db import models

class Chat(models.Model):
    message_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length= 15)
    message = models.CharField(max_length = 100)
