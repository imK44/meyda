let colorList;
let shapeList = ["square", "triangle", "circle", "pentagon"];
let songCommandList = ["play","stop","pause"];

function createSelectH(arr){
    let tem_slect = createSelect();
    arr.forEach((op_)=> tem_slect.option(op_));
    return tem_slect;
}

function setColorBag(name){

    const colorObj = colorList.find(color => color.name === name);
    if(colorObj){
        colorBag.background = colorObj.bg;
    }
}

function colorSetup(){
    colorList = [
        {name:"black", bg : color(0)}, 
        {name:"white", bg : color(197, 197, 197)}, 
        {name:"red",   bg : color(247, 0, 53)}, 
        {name:"blue",  bg : color(9, 52, 93)}, 
        {name:"green", bg : color(0, 51, 3)}
      ];
}

function drawTriangle(posX, posY, size){

    beginShape();
    vertex(posX + 0     * size , posY - 1   * size),
    vertex(posX + 0.866 * size , posY + 0.5 * size),
    vertex(posX - 0.866 * size , posY + 0.5 * size),
    endShape(CLOSE);
}


function polygon(x, y, radius, npoints, sAngle) {

    let startAngle = sAngle;
    
    angleMode(DEGREES);

    var angle = 360 / npoints;

    beginShape();
    for(var i = 0; i < npoints; i ++){

        var sx = x + cos(startAngle) * radius;
        var sy = y + sin(startAngle) * radius;

        vertex(sx, sy);

        startAngle += angle;
    }
    endShape(CLOSE);
}


function setShape(objb){
    centroidShape = objb;
} 