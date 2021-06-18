let soundFilePath = './sounds/Kalte_Ohren_(_Remix_).mp3';
let player;
let meydaAnalizer;
let amplitude;
let volHistory = [];
let wf = [];
let rms = [];
let zcr = [];
let energy = [];
let amplitudeSpectrum = [];
let powerSpectrum = [];
let spectralCentroid = []
let spectralFlatness = [];
let spectralSlope = [];
let spectralRolloff = [];
let spectralSkewness = [];
let spectralKurtosis = [];
let chroma = [];
let loudness = [];
let loudnessTotal = [];
let perceptualSpread = [];
let perceptualSharpness = [];
let fft;
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
          volHistory = [];
          rms=[];
          zcr=[];
          energy= [];
          amplitudeSpectrum = [];
          powerSpectrum = [];
          spectralCentroid = [];
          spectralFlatness = [];
          spectralSlope = [];
          spectralRolloff = [];
          spectralSkewness = [];
          spectralKurtosis = [];
          chroma = [];
          loudnessTotal = [];
          loudness = [];
          perceptualSpread = [];
          perceptualSharpness = [];
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
      "featureExtractors": [
        "rms", 
        "zcr", 
        "energy", 
        "amplitudeSpectrum", 
        "powerSpectrum",
        "spectralCentroid", 
        "spectralFlatness", 
        "spectralSlope",
        "spectralRolloff",
        "spectralSkewness",
        "spectralKurtosis", 
        "chroma",
        "loudness",
        "perceptualSpread",
        "perceptualSharpness"
      ],
      "callback": features => {
        console.log(features);
        //here set the variable that will be controlled by the extracted values.
        //<variable name> = features.rms; // these values need to be remapped to a more suitable set of values.
        rms.push(features.rms);
        zcr.push(features.zcr);
        energy.push(features.energy)
        amplitudeSpectrum = features.amplitudeSpectrum;
        powerSpectrum = features.powerSpectrum;
        spectralCentroid.push(features.spectralCentroid);
        spectralFlatness.push(features.spectralFlatness);
        spectralSlope.push(features.spectralSlope);
        spectralRolloff.push(features.spectralRolloff);
        spectralSkewness.push(features.spectralSkewness);
        spectralKurtosis.push(features.spectralKurtosis);
        chroma = features.chroma;
        loudness = features.loudness.specific;
        loudnessTotal.push(features.loudness.total);
        perceptualSpread.push(features.perceptualSpread);
        perceptualSharpness.push(features.perceptualSharpness);
      }
    })
  }
  let canvas = createCanvas(1200, 400);
  canvas.parent('p5Canvas');


  amplitude = new p5.Amplitude(); 
  fft = new p5.FFT();
  fft.setInput(player);

  //console.log(wf.length);
  
}
  
function draw() {
  background(0);

  noFill();


  //Amplitude
  let vol = amplitude.getLevel();
  if(player.isPlaying()){
    volHistory.push(vol);
  }

  //displayArray(volHistory, 0, 1, 1, color(255, 255, 255));

  if(volHistory.length > width) {
    volHistory.splice(0,1);
  }
  //Amplitude

 
  //displayArray(rms, 0, 1, 4, color(255, 0, 0));
  //displayArray(zcr, 0, 512, 4, color(0, 255, 0));
  //displayArray(energy, 0, 10, 1, color(0, 0, 255));
  //displayFreqArray(amplitudeSpectrum, 0, 10, 1, color(0, 255, 0));
  //displayFreqArray(powerSpectrum, 0, 10, 1, color(200, 100, 100));

  //displayArray(spectralCentroid, 0, 100, 1, color(0, 0, 255));
  //displayArray(spectralFlatness, 0, 1, 10, color(0, 255, 255));
  //displayArray(spectralSlope, 0, 1, 10, color(0, 255, 255));
  //displayArray(spectralRolloff, 0, 22000, 1, color(255, 255, 255));
  //displayArray(spectralSkewness, -10, 20, 1, color(255, 255, 255));
  //displayArray(spectralKurtosis, -300, 100, 1, color(255, 0, 255));
  //displayFreqArray(chroma, 0, 1, 1, color(255, 255, 0))
  
  
  
  //displayFreqArray(loudness, 0, 2, 1, color(255, 0, 255));
  //displayArray(loudnessTotal, 0, 50, 1, color(0, 0, 255));
  //displayArray(perceptualSpread, 0, 1, 1, color(255, 100, 0));
  displayArray(perceptualSharpness, 0, 1, 1, color(100, 250, 100));
  
  


}

function displayArray(array, min, max, yScale, color){
  beginShape();
  for (let i = 0; i < array.length; i++) {
    stroke(color)
    let y = map(array[i]* yScale, min, max, 200, 0) ;
    vertex(i/2, y);
  }
  endShape();

  if(array.length > width) {
    array.splice(0,1);
  }
}

function displayFreqArray(array, min, max, yScale, color){
  beginShape();
  for (let i = 0; i < array.length; i++) {
    stroke(color)
    let y = map(array[i]* yScale, min, max, 200, 0) ;
    let x = map(i, 0, array.length, 0, width)
    vertex(x, y);
  }
  endShape();
}