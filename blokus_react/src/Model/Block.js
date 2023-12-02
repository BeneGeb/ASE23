export class Block {
  constructor(block_id, template, color) {
    this.template = template;
    this.color = color;
    this.block_id = block_id;
  }

  getSize() {
    let count = 0;
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template[i].length; j++) {
        if (this.template[i][j] === true) {
          count++;
        }
      }
    }
    return count;
  }

  turnBlock() {
    const rows = this.template.length;
    const cols = this.template[0].length;

    const rotatedArray = Array.from({ length: cols }, () =>
      Array(rows).fill(null)
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotatedArray[j][rows - 1 - i] = this.template[i][j];
      }
    }

    this.template = rotatedArray;
  }

  mirrorBlock() {
    this.template = this.template.map((row) => row.reverse());
  }

  evalAllRelativePositions() {
    let allIndexList = [];

    this.template.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === true) {
          allIndexList.push(this.evalRelativPositions(x, y));
        }
      });
    });
    return allIndexList;
  }

  evalRelativPositions(givenX, givenY) {
    let indexList = [];
    this.template.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === true) {
          let index = x - givenX;
          index = index + (y - givenY) * 20;
          indexList.push(index);
        }
      });
    });
    return indexList;
  }

  evalAllFixedIndices(index) {
    let allFixesIndices = [];
    this.evalAllRelativePositions().forEach((indexList) => {
      let fixedIndices = [];
      indexList.forEach((relativIndex) => {
        fixedIndices.push(relativIndex + index);
      });

      allFixesIndices.push(fixedIndices);
    });

    return allFixesIndices;
  }
}
