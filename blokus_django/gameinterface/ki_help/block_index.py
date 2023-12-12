class Blockevaluator:
    def __init__(self, Block):
        self.Block = Block

    def mirrorBlock(self):
        mirroredBlock = []

        for row in self.Block:
            mirroredBlock.append(row[::-1])

        self.Block = mirroredBlock

    def rotateBlock(self):
        rows = len(self.Block)
        cols = len(self.Block[0])

        rotatedArray = [[None]*rows for _ in range(cols)]

        for i in range(rows):
            for j in range(cols):
                rotatedArray[j][rows - 1 - i] = self.Block[i][j]

        self.Block = rotatedArray

    def evalAllRelativePositions(self):
        allIndexList = []

        for y, row in enumerate(self.Block):
            for x, value in enumerate(row):
                if value == True:
                    allIndexList.append(
                        self.evalRelativPositions(x, y, self.Block))

        return allIndexList

    def evalRelativPositions(self, givenX, givenY, Block):
        indexList = []

        for y, row in enumerate(Block):
            for x, value in enumerate(row):
                if value == True:
                    index = x - givenX
                    index = index + (y - givenY) * 20
                    indexList.append(index)

        return indexList

    def evalAllFixedIndices(self, index):
        allFixesIndices = []

        for indexList in self.evalAllRelativePositions():
            fixedIndices = [relativIndex + index for relativIndex in indexList]
            allFixesIndices.append(fixedIndices)

        return allFixesIndices
