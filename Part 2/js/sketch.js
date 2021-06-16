let soundFilePath = './sounds/Ex2_sound1.wav';
let player;
let meydaAnalizer;

let buttonsReferences;


function preload() {
  player = loadSound(soundFilePath, () => {console.log(`File ${soundFilePath} loaded`)});    
}

function setup() {
  buttonsReferences = new ButtonsReferences();

      // //binding buttons
      buttonsReferences.mic.mouseClicked((e) => {
        console.log('Mic button pressed');
        let isMicBtnPressed = buttonsReferences.mic.elt.ariaPressed === 'true';
        if(isMicBtnPressed){
            console.log('Microphone on');
            player.disconnect();
            microphone.connect(filterEffect);
            inputFft = new p5.FFT();
            inputFft.setInput(microphone);
            
        }else{
            console.log('Microphone off');
            microphone.stop();
            microphone.disconnect();
            inputFft = new p5.FFT();
            inputFft.setInput(player);
            player.connect(filterEffect);
        }
    })

    buttonsReferences.play.mouseClicked((e)=>{ 
        console.log('Play button pressed');
        if(player.isLoaded() && !player.isPlaying()){
          player.play();
          meydaAnalizer.start();
        }
    });

    buttonsReferences.stop.mouseClicked((e) =>{
        console.log('Stop button pressed');
        player.stop();
        meydaAnalizer.stop();
    });

    buttonsReferences.pause.mouseClicked((e) => {
        console.log('Pause button pressed');
            player.pause();
            meydaAnalizer.stop();
    });

    buttonsReferences.loop.mouseClicked((e) => {
        console.log('Loop button pressed');
        let isLoopBtnPressed = buttonsReferences.loop.ariaPressed === 'true';
        player.setLoop(isLoopBtnPressed);
    });

    buttonsReferences.skipToEnd.mouseClicked((e) => {
        player.jump(player.duration() - 1);
    });

    buttonsReferences.skipToStart.mouseClicked((e) => {
        player.jump(0);
    });

    
  if(typeof(Meyda) === "undefined"){
    console.log("Meyda could not be found");
  }else{
    meydaAnalizer = Meyda.createMeydaAnalyzer({
      "audioContext": getAudioContext(),
      "source": player,
      "bufferSize": 512,
      "featureExtractors": ["rms", "zcr"],
      "callback": features => {
        console.log(features);
        //here set the variable that will be controlled by the extracted values.
        //<variable name> = features.rms; // these values need to be remapped to a more suitable set of values.
      }
    })
  }
  let canvas = createCanvas(400, 400);
  canvas.parent('p5Canvas');
}
  
function draw() {
  background(220);

}