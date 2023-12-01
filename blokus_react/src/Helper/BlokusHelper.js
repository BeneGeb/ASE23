export function checkFieldPossible(indexList, color, field) {
  for (let i = 0; i < indexList.length; i++) {
    const index = indexList[i];

    if (field[index] !== "") return false; // Wenn das Feld schon belegt ist
    if (field[index - 1] === color) return false; // Wenn links schon belegt ist
    if (field[index + 1] === color) return false; // Wenn rechts schon belegt ist
    if (field[index - 20] === color) return false; // Wenn oben schon belegt ist
    if (field[index + 20] === color) return false; // Wenn unten schon belegt ist
    if (index < 0 || index > 399) return false;
  }
  if (!checkOverflow(indexList)) return false;
  return true;
}

export function evalDiagonalFields(allFields) {
  let allDiagonalFields = [];
  allFields.forEach((index) => {
    const left_up = index - 21;
    if (left_up >= 0 && left_up < 400 && index % 20 !== 0)
      allDiagonalFields.push(left_up);

    const right_up = index - 19;
    if (right_up >= 0 && right_up < 400 && index % 20 !== 19)
      allDiagonalFields.push(right_up);

    const left_down = index + 19;
    if (left_down >= 0 && left_down < 400 && index % 20 !== 0)
      allDiagonalFields.push(left_down);

    const right_down = index + 21;
    if (right_down >= 0 && right_down < 400 && index % 20 !== 19)
      allDiagonalFields.push(right_down);
  });
  return allDiagonalFields;
}

function checkOverflow(indexList) {
  const followingIndices = findFollowingIndices(indexList);
  let result = true;
  followingIndices.forEach((sublist) => {
    const firstResult = Math.floor(sublist[0] / 20);
    sublist.forEach((index) => {
      if (Math.floor(index / 20) !== firstResult) result = false;
    });
  });
  return result;
}

function findFollowingIndices(input) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] + 1 == input[i + 1]) {
      let j = i;
      let sublist = [];
      sublist.push(input[j]);
      while (input[j] + 1 == input[j + 1]) {
        j += 1;
        sublist.push(input[j]);
      }
      result.push(sublist);
      i = j;
    }
  }
  return result;
}
