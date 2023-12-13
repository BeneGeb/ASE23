from .models import KI, Player
from .ki_help.block_ki import ki_move
import random

colorMatcher = {
    "#FF0000": "red",
    "#0000FF": "blue",
    "#FFFF00": "yellow",
    "#00FF00": "green"
}


def ki_perform_move(field, inc_player_index, color_hex):
    print("KI is thinking...")
    ki_id = KI.objects.get(player_index=inc_player_index).ki_id
    color = colorMatcher[color_hex]
    # print(f"player_index_id: {player_index_id}")
    # print(len(field))
    ki = KI.objects.get(ki_id=ki_id)

    # print(ki)

    # blocks = ki.get_blocks()[3]
    # color = "blue"
    print(f"ki.blocks_array: {len(ki.get_blocks())}")

    block_variation = Block_variation(
        ki.get_blocks(),  inc_player_index, color, field, ki_id)

    print(f"block_variation: {block_variation}")
    if block_variation == []:
        return []

    block_variation = block_variation[random.randint(
        0, len(block_variation)-1)]
    print(f"block_variation: {block_variation}")
    return block_variation


def Block_variation(blocks, player_index_id, color, field, ki_id):
    chosen_block = 0
    rev_blocks = list(reversed(blocks))

    for index, block in enumerate(rev_blocks):
        liste = ki_move(field, block, player_index_id, color)
        if liste != []:
            chosen_block = index
            print(f"Acher{index}")
            break
    if liste == []:
        print("KI has not found a move")
        return []
    # wenn es leer game over
    liste = [list(item) for item in set(tuple(row) for row in liste)]
    # blocks = reversed(blocks)
    rev_blocks.pop(chosen_block)
    print(f"Die Länge:  {len(blocks)}")
   # print(f"Mist:    {index}")
    update_ki_blocks(ki_id, list(reversed(rev_blocks)))

    # print(f"liste: {liste}, chosen_block: {chosen_block}")

    return liste


def update_ki_blocks(ki_id, blocks):
    ki = KI.objects.get(ki_id=ki_id)
    ki.set_blocks(blocks)
    ki.save()
