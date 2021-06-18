let soundFilePath = './sounds/Kalte_Ohren_(_Remix_).mp3';
let player;
let meydaAnalizer;
let buttonsReferences;
let dataShapeContainer;


function preload() {
  player = loadSound(soundFilePath, () => {console.log(`File ${soundFilePath} loaded`)});    
}

function setup() {
  buttonsReferences = new ButtonsReferences();
  dataShapeContainer = new DataShapeContainer( new RectDataShapeFactory());

    // //binding buttons
    //   buttonsReferences.mic.mouseClicked((e) => {
    //     console.log('Mic button pressed');
    //     let isMicBtnPressed = buttonsReferences.mic.elt.ariaPressed === 'true';
    //     if(isMicBtnPressed){
    //         console.log('Microphone on');
    //         player.disconnect();
    //         microphone.connect(filterEffect);
    //         inputFft = new p5.FFT();
    //         inputFft.setInput(microphone);
            
    //     }else{
    //         console.log('Microphone off');
    //         microphone.stop();
    //         microphone.disconnect();
    //         inputFft = new p5.FFT();
    //         inputFft.setInput(player);
    //         player.connect(filterEffect);
    //     }
    // })

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

        let dataSet = new DataSet();

        dataSet.rms = features.rms;
        dataSet.zcr = features.zcr;
        dataSet.energy = features.energy;
        dataSet.amplitudeSpectrum = features.amplitudeSpectrum;
        dataSet.powerSpectrum = features.powerSpectrum;
        dataSet.spectralCentroid = features.spectralCentroid;
        dataSet.spectralFlatness = features.spectralFlatness;
        dataSet.spectralSlope = features.spectralSlope;
        dataSet.spectralRolloff = features.spectralRolloff;
        dataSet.spectralSkewness = features.spectralSkewness;
        dataSet.spectralKurtosis = features.spectralKurtosis;
        dataSet.chroma = features.chroma;
        dataSet.loudness = features.loudness.specific;
        dataSet.loudnessTotal = features.loudness.total;
        dataSet.perceptualSpread = features.perceptualSpread;
        dataSet.perceptualSharpness = features.perceptualSharpness;

        dataShapeContainer.update(dataSet);
      }
    })
  }
  let canvas = createCanvas(1200, 400);
  canvas.parent('p5Canvas');
  
}
  
function draw() {
    dataShapeContainer.draw();
}
