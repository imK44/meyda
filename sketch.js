let sounds_dic = ['KO.mp3','sound1.wav', 'sound2.wav', 'sound3.wav','ubmp.wav','lolamoore.mp3','miguelOhara.mp3',
    'WaitaMinute.mp3', 'rightNow.mp3'
];
let sounds = [];
let sound;

let mainUnit;
let gScale;

let colorBag;



function preload(){
    sounds_dic.forEach((name)=> {
        let path = 'assets/'+ name;
        sounds.push(loadSound(path));
        sounds[sounds.length-1].name = name;
    });
    sound = sounds[0];
}
 


function setup(){
    
    createCanvas(700,500);

    angleMode(DEGREES);

    colorBag = {};
    colorSetup(); 
    setColorBag('black');
    
    gScale = 1;

    speechSetup();
    meydaSetup();
    controls();
    

    mainUnit = new MainUnit(width/2, height/2);
    mainUnit.makeSideUnits("energy",0, blue);
    mainUnit.makeSideUnits("rms", 270, purple);
    mainUnit.makeSideUnits("spectralKurtosis",90, orange);
    mainUnit.makeSideUnits("zcr",180 , yellow);

    eyeManager = new EyesManager();

}


function draw(){

    background(colorBag.background);

    mainUnit.sideUnitUpdate(energy,"energy",25,150);
    mainUnit.sideUnitUpdate(rms,"rms",0,150);
    mainUnit.sideUnitUpdate(spectralKurtosis,"spectralKurtosis",-50,150);
    mainUnit.sideUnitUpdate(zcr,"zcr",0,150);


    
    centroidArc(spectralCentroid, 230);
    mainUnit.run();
    eyeManager.run(spectralCentroid, spectralFlatness);

    rms2gScale();


    //recognitionTrack()
}


function rms2gScale(){

    if(rms > 90){
        gScale = 1.3;
    }
    if(gScale >= 1){
        gScale -= 0.05;
    }

}











function controls(){

    let sound_select = createSelectH(sounds_dic);
    sound_select.changed(()=> soundSelect(sound_select.value()));

    let play_button = createButton('play/pause');
    play_button.mouseClicked(()=> soundPlayPause());

    let stop_button = createButton('stop');
    stop_button.mouseClicked(()=> soundStop());
}

function soundSelect(s_){
    sounds.forEach((sound_)=> {
        if(sound_.name == s_) {
            if(sound && sound != sound_){
                sound.stop();
            }  
            sound = sound_;
            meydaSetup();
        }    
    })
}

function soundPlayPause(){
    if(sound){
        if(sound.isPlaying()) {
            sound.pause();
        } else {
            
            sound.play();
            
        }
    }
}

function soundStop(){
    if(sound){
        sound.stop();
    }
}



