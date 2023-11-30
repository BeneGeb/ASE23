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
