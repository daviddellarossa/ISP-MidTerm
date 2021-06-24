let soundFilePath = './sounds/Kalte_Ohren_(_Remix_).mp3';
let player;
let meydaAnalizer;
let buttonsReferences;
let dataShapeContainer;
let backgroundColor;
let speech;


function preload() {
  player = loadSound(soundFilePath, () => {console.log(`File ${soundFilePath} loaded`)});    
}

function setup() {

  //Instantiate button references
  buttonsReferences = new ButtonsReferences();
  
    //Binding HTML buttons events to event listeners
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
        dataShapeContainer.resetFactory(dataShapeContainer.shapeFactory);
    });

    buttonsReferences.loop.mouseClicked((e) => {
        console.log('Loop button pressed');
        let isLoopBtnPressed = buttonsReferences.loop.ariaPressed === 'true';
        player.setLoop(isLoopBtnPressed);
    });

  
    //Configuring Meyda
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

        //Create a new DataSet from Meyda values
        let dataSet = new DataSet();

        dataSet._rms = features.rms;
        dataSet._zcr = features.zcr;
        dataSet._energy = features.energy;
        dataSet._amplitudeSpectrum = features.amplitudeSpectrum;
        dataSet._powerSpectrum = features.powerSpectrum;
        dataSet._spectralCentroid = features.spectralCentroid;
        dataSet._spectralFlatness = features.spectralFlatness;
        dataSet._spectralSlope = features.spectralSlope;
        dataSet._spectralRolloff = features.spectralRolloff;
        dataSet._spectralSkewness = features.spectralSkewness;
        dataSet._spectralKurtosis = features.spectralKurtosis;
        dataSet._chroma = features.chroma;
        dataSet._loudness = features.loudness.specific;
        dataSet._loudnessTotal = features.loudness.total;
        dataSet._perceptualSpread = features.perceptualSpread;
        dataSet._perceptualSharpness = features.perceptualSharpness;

        //Update the dataShapeContainer
        dataShapeContainer.update(dataSet);
      }
    })
  }

  //Configure p5.Speech
  speech = new p5.SpeechRec();
  speech.onResult = parseResult;
  speech.continuous = true;
  speech.interimResults = true;
  speech.start();

  //Configure the canvas
  let canvas = createCanvas(1200, 800);
  canvas.parent('p5Canvas');
  backgroundColor = color(0, 0, 0);
  background(backgroundColor);
  stroke(255);
  colorMode(HSL, 100);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  //Configure the DataShapeContainer, passing a default ShapeFactory
  dataShapeContainer = new DataShapeContainer( new RectDataShapeFactory(), width, height);
}
  
function draw() {
    background(backgroundColor);
    dataShapeContainer.draw();
}


/**
 * Parse results from p5.Speech and takes the proper actions, 
 * like resetting the factory on dataShapeContainer
 * or changing the background colour
 */
function parseResult(){
  let mostRecentWord = speech.resultString.split(' ').pop();
  console.log(mostRecentWord);

  if (mostRecentWord.toLowerCase().indexOf('square')!== -1){ 
    dataShapeContainer.resetFactory(new RectDataShapeFactory());
  }
  else if (mostRecentWord.toLowerCase().indexOf('circle')!== -1){ 
    dataShapeContainer.resetFactory(new EllipseDataShapeFactory());
  }
  else if (mostRecentWord.toLowerCase().indexOf('triangle')!== -1){ 
    dataShapeContainer.resetFactory(new PolyDataShapeFactory(3));
  }
  else if (mostRecentWord.toLowerCase().indexOf('hexagon')!== -1){ 
    dataShapeContainer.resetFactory(new PolyDataShapeFactory(6));
  }
  else if (mostRecentWord.toLowerCase().indexOf('pentagon')!== -1){ 
    dataShapeContainer.resetFactory(new PolyDataShapeFactory(5));
  }
  else if (mostRecentWord.toLowerCase().indexOf('blue')!== -1){ 
    backgroundColor = color(67, 100, 10);
  }
  else if (mostRecentWord.toLowerCase().indexOf('black')!== -1){ 
    backgroundColor = color(0, 100, 0);
  }
  else if (mostRecentWord.toLowerCase().indexOf('red')!== -1){ 
    backgroundColor = color(0, 100, 10);
  }
  else if (mostRecentWord.toLowerCase().indexOf('green')!== -1){ 
    backgroundColor = color(33, 100, 10);
  }
  else if (mostRecentWord.toLowerCase().indexOf('yellow')!== -1){ 
    backgroundColor = color(17, 100, 10);
  }
  else if (mostRecentWord.toLowerCase().indexOf('magenta')!== -1){ 
    backgroundColor = color(83, 100, 10);
  }

}