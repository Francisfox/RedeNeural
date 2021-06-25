function setup(){
    createCanvas(500,500);
    background(0);

    var m1 = new Matrix(1,2);
    var m2 = new Matrix(2,1);
    console.log(m1.data, m2.data)
    console.log(Matrix.multiply(m1,m2).data)
}
function draw(){

}