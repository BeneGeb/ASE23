from .models import KI
# from .ki_help.block_index import Blockevaluator
from .ki_help.block_ki import ki_move


def ki_perfom_move(field, ki_id, player_index_id):
    print("KI is thinking...")
    print(f"player_index_id: {player_index_id}")
    # print(len(field))
    ki = KI.objects.get(ki_id=ki_id)
    # print(ki)
    print(len(ki.get_blocks()))
    blocks = ki.get_blocks()[3]
    color = "blue"
    liste = ki_move(field, blocks, player_index_id, color)
    print(f"liste: {liste}")


def update_ki_blocks(ki_id, blocks):
    ki = KI.objects.get(ki_id=ki_id)
    ki.blocks_array = ki.set_blocks(blocks)
    ki.save()
