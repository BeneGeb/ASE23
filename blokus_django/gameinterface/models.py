from django.db import models

# Create your models here.
class BlokusGameHandler(models.Model):
    blocks = Blocks()



class Blocks(models.Model):
    pass
