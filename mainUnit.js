let blue = [[255,255,255],[11, 169, 245],[2, 46, 68],[5, 20, 28]];
let purple = [[255,255,255],[221, 0, 229],[75, 11, 77], [26, 8, 26]];
let orange = [[255,255,255],[255, 108, 0], [124, 53, 0], [36, 21, 10]];
let yellow = [[255,255,255], [239, 253, 33], [133, 142, 0], [47, 49, 13]];



class MainUnit {
    constructor(posX, posY){

        this. size = width/4;

        this.posX = posX;
        this.posY = posY;
        
        this.centerUnit = new CenterUnit(this.size);
        this.centerUnitRotation = 0;

        this.sideUnits = [];
        this.sideUnitsRotateion = 0;

        this.adder = 0;
        this.rotaterV = 0;
    }

    makeSideUnits(name, angle, color_){
        
        let s_ = this.size/2 + 25;
        let c_array = [ 
            {size:0.5,alpha:255}, {size:0.6,alpha:255},
            {size:0.7,alpha:255}, {size:0.8,alpha:255}
        ]
        this.sideUnits.push(new SideUnit(name,s_, angle, c_array, color_));
    }

    setResources(){
        this.centerUnit.collectResources();
        this.sideUnits.forEach((su)=> su.update());
    }

    draw(){   
        
        push();
        
        translate(this.posX, this.posY);
        scale(gScale);

        this.centerUnit.draw();

        angleMode(RADIANS);

        rotate(this.rotaterV);
        this.sideUnits.forEach((su)=> {
            su.draw();
        })

        pop();
    }

    rotater() {
        if(energy || rms || zcr){
            let x_ = Math.max(energy, rms, zcr); 
            this.adder = x_;
        }
        if(this.adder) this.rotaterV += this.adder;
    }

    slowDown(){
        if(!sound.isPlaying()){
            if(this.rotaterV > 0){
                let r = this.rotaterV/10;
                this.rotaterV -= r;
                this.rotaterV --;
            }
        }
    }

    run() {
        this.setResources();
        this.draw();
        this.rotater();
        this.slowDown();
    }

    sideUnitUpdate(source,name,lowerRange, upperRange){

        this.sideUnits.forEach((su)=> {
            if(su.name == name && source){
                let val = constrain(map(source, lowerRange, upperRange, 0,4),0,4);
                for(let i = 0; i < int(val); i ++){
                    setTimeout(()=> {
                        su.child[i].alpha = 255;
                    }, i * 10  );
                }
            }
        })
    }


}

class SideUnit {
    constructor(name_,offset,angle,child, color_){
        this.name = name_;
        this.offx = offset;
        this.angle = angle;
        this.child = child;
        this.gap = 25;
        this.color = color_;
        
    }

    draw(){
        push();
        angleMode(DEGREES);
        rotate(this.angle);
        
        let go = this.offx;

        this.child.forEach((sz_) => {
            let xOf = 15 * sz_.size ;
         
            let scale_ = [1.3,1.2,1.1,1];

            
            push();
            translate(go, 0)
            for(var i = 4;  i >= 1 ; i --){
                
                let scale = scale_[4 - i] * sz_.size;

                fill(...this.color[i-1], sz_.alpha);
                stroke(0,sz_.alpha);
                strokeWeight(0.5);
                beginShape();
                vertex(0 * scale - xOf,-100 * scale);
                bezierVertex(30 *scale + xOf,-50*scale, 30*scale+ xOf, 50*scale, 0*scale - xOf, 100*scale);
                bezierVertex(20 *scale - xOf, 50*scale, 20*scale- xOf,-50*scale, 0*scale - xOf,-100*scale);
                endShape(CLOSE);

                xOf -= 5 * sz_.size;
            }
            pop();
            go += this.gap

        })
        
        pop();
    }

    update(){
        this.child.forEach((i)=>{
            if(i.alpha > 0){
                i.alpha -= 10;
            }
        })
    }


}

class CenterUnit {
    constructor(size_){
        this.size = size_ - 0;
        this.buffer = [];
    }


    draw(){
        this.bufferDraw();
    }

    bufferDraw(){

        let yOff = 0;
        noFill();
        strokeWeight(1);

        stroke('white');
        
        if(this.buffer.length > 1){
            beginShape();
            for(var i = 0 ; i < this.buffer.length; i ++){
                let x = map(i,0, this.buffer.length, -this.size/2, this.size/2);
                let y = map(this.buffer[i], -1, 1, this.size/4 , -this.size/4);
                vertex(x,y + yOff);
            }
            endShape();
        }
        
        

        let x = 0;
        let y = 0;

        if(sound.isPlaying()){
            x = random(-1,1);
            y = random(-1,1);
        }

        fill('white')
        ellipse(-this.size/2 + x, yOff + y, 5);
        ellipse(this.size/2 + x, yOff + y, 5);
    }

    collectResources(){
        if(buffer){
            this.buffer = buffer;
        }
    }

}



