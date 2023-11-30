export class Block {
  constructor(template, color) {
    this.template = template;
    this.color = color;
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
    const transposedArray = [];

    for (let i = 0; i < this.template[0].length; i++) {
      transposedArray[i] = [];
      for (let j = 0; j < this.template.length; j++) {
        transposedArray[i][j] = this.template[j][i];
      }
    }

    return transposedArray;
  }

  et() {
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
