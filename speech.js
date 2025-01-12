
let speechRec;
let isListening;



function speechSetup(){

  isListening = false;
  
  let lang = navigator.language || 'en-US';
  speechRec = new p5.SpeechRec(lang, gotSpeech); 

  speechRec.continuous = true;
  speechRec.interimResults = false;



  let speechRecBut = createButton('speech- On/Off');
  speechRecBut.mousePressed(startSpeechRecognition);

  speechRec.onStart = () => {
    console.log('listening started');
    isListening = true;
  }

  speechRec.onEnd = () => {
    console.log('speech recognition stopped.');
    isListening = false;
  }
    
}

function startSpeechRecognition(){
  if(isListening){
    speechRec.stop();
  } else {
    speechRec.start();
  }
  
}


function gotSpeech() {
    if (speechRec.resultValue) {
      console.log(speechRec.resultString);
      listenSpeech(speechRec.resultString);
    }
}


// let colorCommand;
// let shapeCommand;

function listenSpeech(command){

  const words = command.toLowerCase().match(/\b\w+\b/g);

  let colorCommand = words.filter(word => colorList.some(color=>color.name === word));
  let shapeCommand = words.filter(word => shapeList.includes(word));
  let songCommand   = words.filter(word => songCommandList.includes(word));

  if(colorCommand[colorCommand.length - 1]) {

    let obja = colorCommand[colorCommand.length - 1];

    console.log('background : ' , obja);
    setColorBag(obja);
  }
  if(shapeCommand[shapeCommand.length - 1]) {

    let objb = shapeCommand[shapeCommand.length - 1];
    console.log('shape : ',objb);
    setShape(objb);
  }

  if(songCommand[songCommand.length -1]){
    
    let objc = songCommand[songCommand.length -1];
    console.log('song : ',objc);
    songCommandListen(objc);
  }
}


function songCommandListen(objc){
  
  if(objc == 'play' && !sound.isPlaying()) soundPlayPause();

  if(objc == 'pause' && sound.isPlaying()) soundPlayPause();

  if(objc == 'stop') soundStop();
}
