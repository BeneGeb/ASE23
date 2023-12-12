from .block_index import Blockevaluator


def ki_move(field, blocks, player_index_id, color):
    block_valuator = Blockevaluator(blocks)
    Findcolor = checkcolor(field, color)
    Finddiagonal = eval_diagonal_fields(Findcolor)
    # print(Findcolor)
    # print(Finddiagonal)
    markedfiled = []
    startpos = 0
    player_index_id = 3
    if len(Finddiagonal) != 0:
        for index in Finddiagonal:
            newfield = block_valuator.evalAllFixedIndices(index)
        for possibility in newfield:
            if check_possible_moves(field, possibility, color):
                markedfiled.append(possibility)
        # print(f"markedfiled: {markedfiled}")

        k = 0
        for j in range(2):
            k += 1
            for i in range(3):
                k += 1
                newfield = block_valuator.rotateBlock()
                newfield = block_valuator.evalAllFixedIndices(index)

                for possibility in newfield:
                    if check_possible_moves(field, possibility, color):
                        markedfiled.append(possibility)
                # print(f"markedfiled: {markedfiled}")
                # if markedfiled != []:
                #     break
            newfield = block_valuator.mirrorBlock()
            newfield = block_valuator.evalAllFixedIndices(index)
            if check_possible_moves(field, possibility, color):
                markedfiled.append(possibility)
        # print(k)
        return markedfiled

    elif len(Finddiagonal) == 0:
        match player_index_id:

            case 0: startpos = 0
            case 1: startpos = 380
            case 2: startpos = 399
            case 3: startpos = 19

        # newfield = block_valuator.mirrorBlock()
        newfield = block_valuator.rotateBlock()
        newfield = block_valuator.rotateBlock()

        newfield = block_valuator.evalAllFixedIndices(startpos)

        for possibility in newfield:
            if check_possible_moves(field, possibility, color):
                markedfiled.append(possibility)
        # print(f"markedfiled: {markedfiled}")
        k = 0
        for j in range(2):
            k += 1
            for i in range(3):
                k += 1
                newfield = block_valuator.rotateBlock()
                newfield = block_valuator.evalAllFixedIndices(startpos)

                for possibility in newfield:
                    if check_possible_moves(field, possibility, color):
                        markedfiled.append(possibility)
                # print(f"markedfiled: {markedfiled}")
                # if markedfiled != []:
                #     break
            newfield = block_valuator.mirrorBlock()
            newfield = block_valuator.evalAllFixedIndices(startpos)
            if check_possible_moves(field, possibility, color):
                markedfiled.append(possibility)
        # print(k)
        return markedfiled
    else:
        print("KI has not found a move")
        return False


def check_possible_moves(field, possibility, color):
    for i in range(len(possibility)):
        index = possibility[i]

        if index < 0 or index > 399:
            return False

        if field[index] != "":
            return False
        if index - 1 >= 0 and field[index - 1] == color:
            return False
        if index + 1 < len(field) and field[index + 1] == color:
            return False
        if index - 20 >= 0 and field[index - 20] == color:
            return False
        if index + 20 < len(field) and field[index + 20] == color:
            return False

    if not check_overflow(possibility):
        return False
    return True


def check_overflow(possibility):
    followingIndices = find_following_indices(possibility)
    result = True
    for sublist in followingIndices:
        firstResult = sublist[0] // 20
        for index in sublist:
            if index // 20 != firstResult:
                result = False

    return result


def find_following_indices(input):
    result = []
    i = 0
    while i < len(input) - 1:
        if input[i] + 1 == input[i + 1]:
            j = i
            sublist = [input[j]]
            while j < len(input) - 1 and input[j] + 1 == input[j + 1]:
                j += 1
                sublist.append(input[j])
            result.append(sublist)
            i = j
        i += 1

    return result


def checkcolor(field, color):
    colorfield = []
    for i in range(len(field)):
        if field[i] == color:
            colorfield.append(i)
    return colorfield


def eval_diagonal_fields(allFields):
    allDiagonalFields = []
    for index in allFields:
        left_up = index - 21
        if 0 <= left_up < 400 and index % 20 != 0:
            allDiagonalFields.append(left_up)

        right_up = index - 19
        if 0 <= right_up < 400 and index % 20 != 19:
            allDiagonalFields.append(right_up)

        left_down = index + 19
        if 0 <= left_down < 400 and index % 20 != 0:
            allDiagonalFields.append(left_down)

        right_down = index + 21
        if 0 <= right_down < 400 and index % 20 != 19:
            allDiagonalFields.append(right_down)

    return allDiagonalFields
