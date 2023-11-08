export class Block{
    constructor(template, color){
        this.template = template;
        this.color = color;
    }
    
    getSize(){
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

    turnBlock(){
        const transposedArray = [];

        for (let i = 0; i < this.template[0].length; i++) {
            transposedArray[i] = [];
            for (let j = 0; j < this.template.length; j++) {
            transposedArray[i][j] = this.template[j][i];
            }
        }

        return transposedArray;
    }
    

}