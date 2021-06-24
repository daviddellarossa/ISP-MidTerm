let soundFilePath = 'sounds/kipling.wav';
let canvas;
let recorder;
let soundFile;
let player;
let microphone;

//Effects Settings
let reverbSettings;
let buttonsReferences;
let filterSettings;
let waveshaperDistortionSettings;
let delaySettings;
let dynamicCompressorSettings;
let masterSettings;

//Effects
let reverbEffect;
let buttonsEffect;
let filterEffect;
let waveshaperDistortionEffect;
let delayEffect;
let dynamicCompressorEffect;
let masterEffect;

//FFT
let inputFft;
let outputFft;


function preload() {
    player = loadSound(soundFilePath, () => {console.log(`File ${soundFilePath} loaded`)});
    player.disconnect();      
    }


function setup(){

    //Create references to the HTML controls
    reverbSettings = new ReverbSettings();
    buttonsReferences = new ButtonsReferences();
    filterSettings = new FilterSettings();
    waveshaperDistortionSettings = new WaveshaperDistortionSettings();
    delaySettings = new DelaySettings();
    dynamicCompressorSettings = new DynamicCompressorSettings();
    masterSettings = new MasterSettings();

    //binding buttons' events from the UI to event listeners
    //Mic button
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

    //Play button
    buttonsReferences.play.mouseClicked((e)=>{ 
        console.log('Play button pressed');
        if(player.isLoaded() && !player.isPlaying())
            player.play();
    });

    //Stop button
    buttonsReferences.stop.mouseClicked((e) =>{
        console.log('Stop button pressed');
        player.stop();
    });

    //Pause button
    buttonsReferences.pause.mouseClicked((e) => {
        console.log('Pause button pressed');
            player.pause();
    });

    //Loop button
    buttonsReferences.loop.mouseClicked((e) => {
        console.log('Loop button pressed');
        let isLoopBtnPressed = buttonsReferences.loop.elt.ariaPressed === 'true';
        player.setLoop(isLoopBtnPressed);
    });

    //Record button
    buttonsReferences.record.mouseClicked((e) => {
        console.log('Record button pressed');
        let isRecBtnPressed = buttonsReferences.record.elt.ariaPressed === 'true';
        if(isRecBtnPressed){
            if(player.enabled || microphone.enabled){
                recorder.record(soundFile);
                console.log('Recording');
            }
            else{
                buttonsReferences.record.elt.ariaPressed = 'false';
            }
            
        }else{
            recorder.stop();
            save(soundFile, 'audiofile.wav');
            console.log('Stop Recording');
        }
    });

    //Skip to end
    buttonsReferences.skipToEnd.mouseClicked((e) => {
        player.jump(player.duration() - 1);
    });

    //Skip to start
    buttonsReferences.skipToStart.mouseClicked((e) => {
        player.jump(0);
    });


    //binding filter UI control events with event listeners
    filterSettings.filterTypeLowPass.mouseClicked((e) => {
        console.log(`Filter - Filter Type: ${filterSettings.filterTypeLowPass.value()}`);
        filterEffect.setType(filterSettings.filterTypeLowPass.value());
    })
    filterSettings.filterTypeBandPass.mouseClicked((e) => {
        console.log(`Filter - Filter Type: ${filterSettings.filterTypeBandPass.value()}`);
        filterEffect.setType(filterSettings.filterTypeBandPass.value());
    })
    filterSettings.filterTypeHighPass.mouseClicked((e) => {
        console.log(`Filter - Filter Type: ${filterSettings.filterTypeHighPass.value()}`);
        filterEffect.setType(filterSettings.filterTypeHighPass.value());
    })
    filterSettings.cutoffFrequency.mouseClicked((e) => {
        console.log(`Filter - Cutoff Frequency: ${filterSettings.cutoffFrequency.value()}`);
        filterEffect.set(filterSettings.cutoffFrequency.value(), filterSettings.resonance.value());
    });
    filterSettings.resonance.mouseClicked((e) => {
        console.log(`Filter - Resonance: ${filterSettings.resonance.value()}`);
        filterEffect.set(filterSettings.cutoffFrequency.value(), filterSettings.resonance.value());
    });
    filterSettings.dryWet.mouseClicked((e) => {
        console.log(`Filter - Dry/Wet: ${filterSettings.dryWet.value()}`);
        filterEffect.drywet(filterSettings.dryWet.value());
    });
    filterSettings.outputLevel.mouseClicked((e) => {
        console.log(`Filter - Output Level: ${filterSettings.outputLevel.value()}`);
        filterEffect.amp(filterSettings.outputLevel.value());
    });


    //binding waveshaper distortion UI control events with event listeners

    waveshaperDistortionSettings.distortionAmount.mouseClicked((e) => {
        var oversample = waveshaperDistortionSettings.oversample.value() == 0
        ? 'none'
        : waveshaperDistortionSettings.oversample.value() == 1
            ? '2x'
            : '4x';
            console.log(`Waveshaper Distortion - Distortion Amount: ${waveshaperDistortionSettings.distortionAmount.value()}`);
        waveshaperDistortionEffect.set(
            waveshaperDistortionSettings.distortionAmount.value(),
            oversample
        );
    });

    waveshaperDistortionSettings.oversample.mouseClicked((e) => {
        var oversample = waveshaperDistortionSettings.oversample.value() == 0
        ? 'none'
        : waveshaperDistortionSettings.oversample.value() == 1
            ? '2x'
            : '4x';
        console.log(`Waveshaper Distortion - Oversample: ${oversample}`);
        waveshaperDistortionEffect.set(
            waveshaperDistortionSettings.distortionAmount.value(),
            oversample
        );
    });

    waveshaperDistortionSettings.dryWet.mouseClicked((e) => {
        let dryWet = waveshaperDistortionSettings.dryWet.value();
        console.log(`Waveshaper Distortion - Dry/Wet: ${dryWet}`);
        waveshaperDistortionEffect.drywet(dryWet);
    });

    waveshaperDistortionSettings.outputLevel.mouseClicked((e) => {
        let volume = waveshaperDistortionSettings.outputLevel.value();
        console.log(`Waveshaper Distortion - Volume: ${volume}`);
        waveshaperDistortionEffect.amp(volume)
    });

    //binding delay UI control events with event listeners

    delaySettings.delayTypeDefault.mouseClicked((e) => {
        console.log(`Delay - Delay Type: ${delaySettings.delayTypeDefault.value()}`);
        delayEffect.setType(delaySettings.delayTypeDefault.value());
    });
    delaySettings.delayTypePingPong.mouseClicked((e) => {
        console.log(`Delay - Delay Type: ${delaySettings.delayTypePingPong.value()}`);
        delayEffect.setType(delaySettings.delayTypePingPong.value());
    });
    delaySettings.delayTime.mouseClicked((e) => {
        console.log(`Delay - Time: ${delaySettings.delayTime.value()}`);
        delayEffect.delayTime(delaySettings.delayTime.value());
    });

    delaySettings.feedback.mouseClicked((e) => {
        console.log(`Delay - Feedback: ${delaySettings.feedback.value()}`);
        delayEffect.feedback(delaySettings.feedback.value());
    });

    delaySettings.lowPass.mouseClicked((e) => {
        console.log(`Delay - LowPass: ${delaySettings.lowPass.value()}`);
        delayEffect.filter(delaySettings.lowPass.value());
    });

    delaySettings.dryWet.mouseClicked((e) => {
        let dryWet = delaySettings.dryWet.value();
        console.log(`Delay - Dry/Wet: ${dryWet}`);
        delayEffect.drywet(dryWet);
    })

    delaySettings.outputLevel.mouseClicked((e) => {
        let volume = delaySettings.outputLevel.value();
        console.log(`Delay - Volume: ${volume}`);
        delayEffect.amp(volume)
    })

    //binding dynamic compressor UI control events with event listeners

    dynamicCompressorSettings.attack.mouseClicked((e) => {
        console.log(`Dynamic Compression - Attack: ${dynamicCompressorSettings.attack.value()}`);
        dynamicCompressorEffect.set(
            dynamicCompressorSettings.attack.value(),
            dynamicCompressorSettings.knee.value(),
            dynamicCompressorSettings.ratio.value(),
            dynamicCompressorSettings.threshold.value(),
            dynamicCompressorSettings.release.value()
        );
    });
    dynamicCompressorSettings.knee.mouseClicked((e) => {
        console.log(`Dynamic Compression - Knee: ${dynamicCompressorSettings.knee.value()}`);
        dynamicCompressorEffect.set(
            dynamicCompressorSettings.attack.value(),
            dynamicCompressorSettings.knee.value(),
            dynamicCompressorSettings.ratio.value(),
            dynamicCompressorSettings.threshold.value(),
            dynamicCompressorSettings.release.value()
        );
    });
    dynamicCompressorSettings.release.mouseClicked((e) => {
        console.log(`Dynamic Compression - Release: ${dynamicCompressorSettings.release.value()}`);
        dynamicCompressorEffect.set(
            dynamicCompressorSettings.attack.value(),
            dynamicCompressorSettings.knee.value(),
            dynamicCompressorSettings.ratio.value(),
            dynamicCompressorSettings.threshold.value(),
            dynamicCompressorSettings.release.value()
        );
    });
    dynamicCompressorSettings.ratio.mouseClicked((e) => {
        console.log(`Dynamic Compression - Ratio: ${dynamicCompressorSettings.ratio.value()}`);
        dynamicCompressorEffect.set(
            dynamicCompressorSettings.attack.value(),
            dynamicCompressorSettings.knee.value(),
            dynamicCompressorSettings.ratio.value(),
            dynamicCompressorSettings.threshold.value(),
            dynamicCompressorSettings.release.value()
        );
    });
    dynamicCompressorSettings.threshold.mouseClicked((e) => {
        console.log(`Dynamic Compression - Threshold: ${dynamicCompressorSettings.threshold.value()}`);
        dynamicCompressorEffect.set(
            dynamicCompressorSettings.attack.value(),
            dynamicCompressorSettings.knee.value(),
            dynamicCompressorSettings.ratio.value(),
            dynamicCompressorSettings.threshold.value(),
            dynamicCompressorSettings.release.value()
        );
    });
    dynamicCompressorSettings.dryWet.mouseClicked((e) => {
        let dryWet = dynamicCompressorSettings.dryWet.value();
        console.log(`Dynamic Compression - Dry/Wet: ${dryWet}`);
        dynamicCompressorEffect.drywet(dryWet);
    });
    dynamicCompressorSettings.outputLevel.mouseClicked((e) => {
        let outputLevel = dynamicCompressorSettings.outputLevel.value();
        console.log(`Dynamic Compression - Output Level: ${outputLevel}`);
        dynamicCompressorEffect.amp(outputLevel);
    });
    

    //binding reverb UI control events with event listeners

    reverbSettings.duration.mouseClicked((e) => {
        console.log(`Reverb - Duration: ${reverbSettings.duration.value()}`);
        reverbEffect.set(reverbSettings.duration.value(), reverbSettings.decayRate.value(), reverbSettings.reverse.value());
    });
    reverbSettings.decayRate.mouseClicked((e) => {
        console.log(`Reverb - Decay Rate: ${reverbSettings.decayRate.value()}`);
        reverbEffect.set(reverbSettings.duration.value(), reverbSettings.decayRate.value(), reverbSettings.reverse.value());
    });
    reverbSettings.reverse.mouseClicked((e) => {
        console.log(`Reverb - Reverse: ${reverbSettings.reverse.value()}`);
        reverbEffect.set(reverbSettings.duration.value(), reverbSettings.decayRate.value(), reverbSettings.reverse.value());
    });
    reverbSettings.dryWet.mouseClicked(() =>{
        let dryWet = reverbSettings.dryWet.value();
        console.log(`Reverb - Dry/Wet: ${dryWet}`);
        reverbEffect.drywet(dryWet);
    });
    reverbSettings.outputLevel.mouseClicked((e) => {
        let volume = reverbSettings.outputLevel.value();
        console.log(`Reverb - Volume: ${volume}`);
        reverbEffect.amp(volume)
    });
    
    //binding master volume UI control events with event listeners

    masterSettings.volume.mouseClicked((e) => {
        console.log(`Gain - Volume: ${masterSettings.volume.value()}`);
        masterVolumeEffect.amp(masterSettings.volume.value());
    });


    //Setting up Microphone

    microphone = new p5.AudioIn((e) => {
        console.log(`Error accessing the microphone: ${e}`)
    });
    microphone.start();

    //Setting up SoundRecorder

    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();
    
    
    //Setting up LowPass Filter

    filterEffect = new p5.Filter();
    filterEffect.process(
        player,
        filterSettings.cutoffFrequency.value(),
        filterSettings.resonance.value()
    );
    filterEffect.drywet(filterSettings.dryWet.value());
    filterEffect.amp(filterSettings.outputLevel.value());


    //Setting up WaveShaper Distortion

    waveshaperDistortionEffect = new p5.Distortion();
    waveshaperDistortionEffect.process(
        filterEffect,
        waveshaperDistortionSettings.distortionAmount.value(),
        waveshaperDistortionSettings.oversample.value() == 0
            ? 'none'
            : waveshaperDistortionSettings.oversample.value() == 1
                ? '2x'
                : '4x'
    );
            
    waveshaperDistortionEffect.drywet(waveshaperDistortionSettings.dryWet.value());
    waveshaperDistortionEffect.amp(waveshaperDistortionSettings.outputLevel.value());

    //Setting up Delay

    delayEffect = new p5.Delay()
    delayEffect.process(
        waveshaperDistortionEffect,
        delaySettings.delayTime.value(),
        delaySettings.feedback.value(),
        delaySettings.lowPass.value()
    );

    delayEffect.drywet(delaySettings.dryWet.value());
    delayEffect.amp(delaySettings.outputLevel.value());

    //Setting up Dynamic Compressor

    dynamicCompressorEffect = new p5.Compressor();
    dynamicCompressorEffect.process(
        delayEffect,
        dynamicCompressorSettings.attack.value(),
        dynamicCompressorSettings.knee.value(),
        dynamicCompressorSettings.ratio.value(),
        dynamicCompressorSettings.threshold.value(),
        dynamicCompressorSettings.release.value()
    );

    dynamicCompressorEffect.drywet(dynamicCompressorSettings.dryWet.value());
    dynamicCompressorEffect.amp(dynamicCompressorSettings.outputLevel.value());

    //Setting up Reverb Effect

    reverbEffect = new p5.Reverb();
    reverbEffect.process(
        dynamicCompressorEffect, 
        reverbSettings.duration.value(), 
        reverbSettings.decayRate.value(), 
        reverbSettings.reverse.value()
    );
    
    reverbEffect.drywet(reverbSettings.dryWet.value());
    reverbEffect.amp(reverbSettings.outputLevel.value());

    //Setting up Master Volume
    masterVolumeEffect = new p5.Gain();
    masterVolumeEffect.amp(masterSettings.volume.value());

    //Preparing effects for chaining

    waveshaperDistortionEffect.disconnect();
    dynamicCompressorEffect.disconnect();
    filterEffect.disconnect();
    reverbEffect.disconnect();
    delayEffect.disconnect();
    player.disconnect();

    //Connect chain

    player.connect(filterEffect);
    filterEffect.connect(waveshaperDistortionEffect);
    waveshaperDistortionEffect.connect(delayEffect);
    delayEffect.connect(dynamicCompressorEffect);
    dynamicCompressorEffect.connect(reverbEffect);
    reverbEffect.connect(masterVolumeEffect);
    masterVolumeEffect.connect();

    //Setting up FFTs for Spectrum display

    inputFft = new p5.FFT();
    inputFft.setInput(player);

    outputFft = new p5.FFT()

    //Setting up canvas

    let canvasContainer = select('#spectrumCanvas');
    canvas = createCanvas(canvasContainer.width, canvasContainer.width / 4);
    canvas.background(200)
    canvas.parent('spectrumCanvas');
}

function draw() {
    canvas.background(255)

    //Read input and output spectra for the current frame
    let spectrumIn = inputFft.analyze();
    let spectrumOut = outputFft.analyze();
    

    //Frequency spectrum visualizer code adapted from https://p5js.org/zh-Hans/examples/sound-frequency-spectrum.html

    beginShape();
    
    //drawing Input spectrum
    for (i = 0; i < spectrumIn.length; i++) {
        var x = map(i, 0, spectrumIn.length, 0, canvas.width / 2);
        vertex(x, map(spectrumIn[i], 0, 255, canvas.height * 0.9, 0));
    }

    //drawing Output spectrum
    for (i = 0; i < spectrumOut.length; i++) {
        var x = map(i, 0, spectrumOut.length, canvas.width / 2, canvas.width);
        vertex(x, map(spectrumOut[i], 0, 255, canvas.height * 0.9, 0));
    }
    endShape();
}

/**
 * Resize canvas for Input and Output Spectra when Window is resized
 */
function windowResized() {
    let canvasContainer = select('#spectrumCanvas');
    resizeCanvas(canvasContainer.width, canvasContainer.width / 4);
  }