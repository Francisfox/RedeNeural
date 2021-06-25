class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for(let i=0; i<rows; i++){
            let arr = [];           
            for(let j=0; j<cols; j++){
                arr.push(Math.floor(Math.random()*10))
            }
            this.data.push(arr);
        }
    }
    static add(A,B){

    }
}