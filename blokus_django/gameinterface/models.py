from django.db import models


# Create your models here.
class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    currPlayer_id = models.IntegerField()
    
class Player(models.Model):
    player_index = models.AutoField(primary_key=True)
    player_id = models.IntegerField(null=True, blank=True)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    player_name = models.CharField(max_length= 15)
    color = models.CharField(max_length=10)
    isAI = models.BooleanField()
    isHuman = models.BooleanField()
    isReady = models.BooleanField()
    hasSurrendered = models.BooleanField()

    def toJSON(self):
        return {
            "player_id": self.player_id,
            "player_name": self.player_name,
            "color": self.color,
            "isReady": self.isReady,
        }
 
class Square(models.Model):
    square_id = models.AutoField(primary_key=True)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    value = models.CharField(max_length=10)