from models import *


ki = KI.objects.create(ki_id=1, player_index=1)
ki.save()
print(ki)
