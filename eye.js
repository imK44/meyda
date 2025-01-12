

let eyeManager;

class EyesManager {
    constructor(){
        this.eyes = [];
    }

    makeEyes(val){
        if(val){
            this.eyes.push(new Eye(int(val)));
        }
    }

    run(bVal, sVal){
        // make eyes
        if(sound.isPlaying()){
             
            this.makeEyes(bVal);
        }

        // draw
        push();
        translate(width/2, height/2);


        //drawing bigEyes
        // traversing the array
        for(var i = 0; i < this.eyes.length; i ++){
            let eye_ = this.eyes[i];

            eye_.draw();
    
            eye_.alphaReduction();
            eye_.cDeadFlag();

            // delete
            if(eye_.deadFlag){
                this.eyes.splice(i,1);
            }
        }

        //drawing small eye
        fill(random(255),random(255),random(255));
        ellipse(- 30, - 30, sVal * 100);
        ellipse(  30, - 30, sVal * 100);

        pop();
    }
}

class Eye {
    constructor(scale){
        this.scale = scale;
        this.alpha = 255;
        this.deadFlag = false;
        this.rotation = random(360);

        this.color = [random(255), random(255), random(255)];
    }

    draw(){

        
        rectMode(CENTER);

        let size = this.scale;

        noFill();
        stroke(...this.color, this.alpha);
        if(gScale > 1){
            rect(-30,-30, size, 2);
            rect(30,-30, size, 2);
        }
        else{

            if(centroidShape == "circle") {
                ellipse(-30, -30, size);
                ellipse( 30, -30, size);
            }
            
            if(centroidShape == 'triangle') {
                drawTriangle(-30,-30,size);
                drawTriangle( 30,-30,size);
            }

            if(centroidShape == 'square'){
                rect(-30,-30, size);
                rect(30, -30, size);
            }

            if(centroidShape == 'pentagon'){
                polygon(-30,- 30, size, 5, 270);
                polygon( 30, -30, size, 5, 270);
            }
            
        }

    }

    alphaReduction(){
        if(this.alpha >= 0 ){
            this.alpha -= 20;
        }
    }

    cDeadFlag(){
        if(this.alpha <= 0){
            this.deadFlag = true;
        }
    }
}
