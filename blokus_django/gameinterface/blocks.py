def all_blocks():

    block1 = [
        [False, False, False, False, False],
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
        [False, False, False, False, False],
    ]

    block2 = [
        [False, False, False, False, False],
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
    ]
    block3 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
    ]

    block4 = [
        [False, False, False, False, False],
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, True, False],
        [False, False, False, False, False],
    ]

    block5 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
    ]

    block6 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, True, True, False, False],
        [False, False, False, False, False],
    ]

    block7 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, True, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
    ]

    block8 = [
        [False, False, False, False, False],
        [False, False, False, False, False],
        [False, True, True, False, False],
        [False, True, True, False, False],
        [False, False, False, False, False],
    ]

    block9 = [
        [False, False, False, False, False],
        [False, False, False, False, False],
        [False, True, True, False, False],
        [False, False, True, True, False],
        [False, False, False, False, False],
    ]

    block10 = [
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
    ]

    block11 = [
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, True, True, False, False],
        [False, False, False, False, False],
    ]

    block12 = [
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, True, True, False, False],
        [False, True, False, False, False],
        [False, False, False, False, False],
    ]

    block13 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, True, True, False, False],
        [False, True, True, False, False],
        [False, False, False, False, False],
    ]

    block14 = [
        [False, False, False, False, False],
        [False, True, True, False, False],
        [False, False, True, False, False],
        [False, True, True, False, False],
        [False, False, False, False, False],
    ]

    block15 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, True, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
    ]

    block16 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, False, True, False, False],
        [False, True, True, True, False],
        [False, False, False, False, False],
    ]
    block17 = [
        [False, False, False, False, False],
        [False, True, False, False, False],
        [False, True, False, False, False],
        [False, True, True, True, False],
        [False, False, False, False, False],
    ]

    block18 = [
        [False, False, False, False, False],
        [False, True, True, False, False],
        [False, False, True, True, False],
        [False, False, False, True, False],
        [False, False, False, False, False],
    ]

    block19 = [
        [False, False, False, False, False],
        [False, True, False, False, False],
        [False, True, True, True, False],
        [False, False, False, True, False],
        [False, False, False, False, False],
    ]

    block20 = [
        [False, False, False, False, False],
        [False, True, False, False, False],
        [False, True, True, True, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
    ]

    block21 = [
        [False, False, False, False, False],
        [False, False, True, False, False],
        [False, True, True, True, False],
        [False, False, True, False, False],
        [False, False, False, False, False],
    ]

    # ... Definieren Sie hier die restlichen Blöcke ...

    result = []
    result.append(block1)
    result.append(block2)
    result.append(block3)
    result.append(block4)
    result.append(block5)
    result.append(block6)
    result.append(block7)
    result.append(block8)
    result.append(block9)
    result.append(block10)
    result.append(block11)
    result.append(block12)
    result.append(block13)
    result.append(block14)
    result.append(block15)
    result.append(block16)
    result.append(block17)
    result.append(block18)
    result.append(block19)
    result.append(block20)
    result.append(block21)

    return result

# def save_blocks(result):
#     blocks = result
#     for i, block in enumerate(blocks, start=1):
#         block_model = Block(block_id=i)
#         block_model.set_data(block)
#         block_model.save()

# def save_ki_blocks(ki_id, blocks):
#     ki_model = ki.objects.get(ki_id=ki_id)
#     ki_model.set_blocks(blocks)
#     ki_model.save()
