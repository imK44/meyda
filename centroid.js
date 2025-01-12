let keepVal = 0;
let centroidShape = 'circle';


function centroidArc(val_, size){

    if(val_ > keepVal){
        if(keepVal < 200){
            keepVal += (val_ - keepVal)/2;
        }
    }
    keepVal = int(keepVal);

    let sec = 100; //segments
    let flagVal = map(keepVal, 0, 90, 0, sec);
    let each_sec = 360/sec;
    

    

    push();
    translate(width/2, height/2);
    drawCenCir(flagVal,each_sec,sec,size);


    if(centroidShape == 'circle') drawCenCovCir();
    if(centroidShape == 'triangle') drawCenCovTri();
    if(centroidShape == 'square') drawCenCovSquare();
    if(centroidShape == 'pentagon') drawCenCovPen();

    pop();

    if(keepVal > 0){
        keepVal --;
    }
    
}


function drawCenCir(flagVal,each_sec,sec,size){

    angleMode(RADIANS);
    noStroke();
    scale(gScale);
    for(var i = 1; i <= sec; i ++){
        fill(map(i,0,sec,0,255),0,255);
        if(i <= flagVal  ){//&&  i > flagVal * 1/3 
            arc(0, 0, size, size, 0 + i * each_sec, i * each_sec + each_sec);
        }
    }

    for(var i = 1; i <= sec ; i ++){
        fill(map(i,0,sec,0,255),0,255);
        if(i <= flagVal  ){// &&  i > flagVal * 1/3 
            arc(0, 0, size, size, 180 + i * each_sec, 180 + i * each_sec + each_sec);
        }  
    }
}

function drawCenCovCir(){
    
    //cover ellipse
    fill(colorBag.background);
    ellipse(0, 0, 200);
}


function drawCenCovTri(){

    angleMode(DEGREES);
    rotate(180);


    let sc_a = 115;

    // outerCover
    fill(colorBag.background);
    beginShape();
    vertex( 0     * sc_a , -1  * sc_a ),
    vertex( 0.866 * sc_a , 0.5 * sc_a),
    vertex(-0.866 * sc_a , 0.5 * sc_a),
    vertex( 0     * sc_a , -1  * sc_a ),
    vertex( 0     * sc_a , -2.5  * sc_a ),
    vertex( -2.17     * sc_a , 1.25  * sc_a ),
    vertex( 2.17     * sc_a , 1.25  * sc_a ),
    vertex( 0     * sc_a , -2.5  * sc_a ),
    endShape(CLOSE);

    
    //innerCover
    sc_a = 80;
    fill(colorBag.background);
    drawTriangle(0,0, sc_a);

}


function drawCenCovSquare(){
    rectMode(CENTER);

    noFill();
    strokeWeight(40);
    stroke(colorBag.background);
    rect(0, 0, 200, 200);

    noStroke();
    fill(colorBag.background);
    rect(0,0, 120,120);
}


function drawCenCovPen(){
    noFill();
    strokeWeight(30);
    stroke(colorBag.background);
    polygon(0, 0, 130, 5, 270);

    noStroke();
    fill(colorBag.background);
    polygon(0,0, 85, 5, 270 );
}