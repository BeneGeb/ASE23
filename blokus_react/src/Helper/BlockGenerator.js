import { Block } from "../Model/Block";

export function generateBlocks(){
    let result = []

    const colors = ["red", "blue", "green", "yellow"]
    const allTemplates = getArrayOfBlocks()


    colors.forEach(color => {
      let colorBlocks = []
      allTemplates.forEach(template => {
        colorBlocks.push(new Block(template, color))
      })
      result.push(colorBlocks)
    });
    return result;
}

//Reference: https://www.spiele4us.de/wp-content/uploads/2022/10/blokus-von-piatnik-gebraucht-g003501030.pdf


function getArrayOfBlocks(){
  let result = []

  result.push(block1)
  result.push(block2)
  result.push(block3)
  result.push(block4)
  result.push(block5)
  result.push(block6)
  result.push(block7)
  result.push(block8)
  result.push(block9)
  result.push(block10)
  result.push(block11)
  result.push(block12)
  result.push(block13)
  result.push(block14)
  result.push(block15)
  result.push(block16)
  result.push(block17)
  result.push(block18)
  result.push(block19)
  result.push(block20)
  result.push(block21)

  return result
}


//Blocks with One Square
const block1 = [
  [false, false, false, false, false],
  [false, false, false, false,false],
  [false, false, true, false,false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

//Blocks with 2 Squares
const block2 = [
  [false, false, false, false, false],
  [false, false, false, false,false],
  [false, false, true, false,false],
  [false, false, true, false, false],
  [false, false, false, false, false],
];

//Block with 3 Squares
const block3 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, false, true, false, false],
  [false, false, false, false, false],
];

const block4 = [
  [false, false, false, false, false],
  [false, false, false, false,false],
  [false, false, true, false,false],
  [false, false, true, true, false],
  [false, false, false, false, false],
];

//Blocks with 4 Sqauraes
const block5 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, false, true, false, false],
  [false, false, true, false, false],
];

const block6 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];

const block7 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, true,false],
  [false, false, true, false, false],
  [false, false, false, false, false],
];

const block8 = [
  [false, false, false, false, false],
  [false, false, false, false,false],
  [false, true, true, false,false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];

const block9 = [
  [false, false, false, false, false],
  [false, false, false, false,false],
  [false, true, true, false,false],
  [false, false, true, true, false],
  [false, false, false, false, false],
];

//Blocks with 5 Squares
const block10 = [
  [false, false, true, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, false, true, false, false],
  [false, false, true, false, false],
];

const block11 = [
  [false, false, true, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];

const block12 = [
  [false, false, true, false, false],
  [false, false, true, false,false],
  [false, true, true, false,false],
  [false, true, false, false, false],
  [false, false, false, false, false],
];

const block13 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, true, true, false,false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];

const block14 = [
  [false, false, false, false, false],
  [false, true, true, false,false],
  [false, false, true, false,false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];

const block15 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, true,false],
  [false, false, true, false, false],
  [false, false, true, false, false],
];

const block16 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, false, true, false,false],
  [false, true, true, true, false],
  [false, false, false, false, false],
];

const block17 = [
  [false, false, false, false, false],
  [false, true, false, false,false],
  [false, true, false, false,false],
  [false, true, true, true, false],
  [false, false, false, false, false],
];

const block18 = [
  [false, false, false, false, false],
  [false, true, true, false,false],
  [false, false, true, true,false],
  [false, false, false, true, false],
  [false, false, false, false, false],
];

const block19 = [
  [false, false, false, false, false],
  [false, true, false, false,false],
  [false, true, true, true,false],
  [false, false, false, true, false],
  [false, false, false, false, false],
];

const block20 = [
  [false, false, false, false, false],
  [false, true, false, false,false],
  [false, true, true, true,false],
  [false, false, true, false, false],
  [false, false, false, false, false],
];

const block21 = [
  [false, false, false, false, false],
  [false, false, true, false,false],
  [false, true, true, true,false],
  [false, false, true, false, false],
  [false, false, false, false, false],
];






