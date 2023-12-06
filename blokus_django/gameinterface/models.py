from django.db import models


# Create your models here.
class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    currPlayer_id = models.IntegerField()
    
class Player(models.Model):
    player_id = models.AutoField(primary_key=True)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    color = models.CharField(max_length=10)
    isAI = models.BooleanField()
    isHuman = models.BooleanField()
 
class Square(models.Model):
    square_id = models.AutoField(primary_key=True)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    value = models.CharField(max_length=10)