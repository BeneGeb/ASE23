export function isIndexInArrayOfArray(index, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(index)) {
      return true;
    }
  }
  return false;
}

export function findIndexInArrayOfArray(index, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(index)) {
      return array[i];
    }
  }
  return [];
}

export function findFieldsOfColorInArray(color, input) {
  var fields = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] === color) {
      fields.push(i);
    }
  }
  return fields;
}

// export function findFieldsOfColorInArray(color, field) {
//   var fields = [];
//   for (var i = 0; i < field.length; i++) {
//     if (squaresArray[i] === color) {
//       fields.push(i);
//     }
//   }
//   return fields;
// }
