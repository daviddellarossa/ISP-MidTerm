
//let sound;
let sketchP5 = function(p){

    // this.player;
    // this.reverbEffect;

    p.preload = function() {
        p.soundFormats('mp3', 'ogg');
        this.player = p.loadSound('./sounds/kipling.wav', () => {console.log('File loaded')});
        this.player.disconnect();
      }


    p.setup = function() {
        this.reverb = new ReverbSettings(p);
        this.buttons = new ButtonsReferences(p);
        this.filter = new FilterSettings(p);
        this.waveshaperDistortion = new WaveshaperDistortionSettings(p);
        this.dynamicCompressor = new DynamicCompressorSettings(p);
        this.master = new MasterSettings(p);

        // //binding buttons
        this.buttons.mic.mouseClicked((e) => {
            p.userStartAudio();
            console.log('Mic button pressed');
            let isMicBtnPressed = this.buttons.mic.elt.ariaPressed === 'true';
            if(isMicBtnPressed){
                console.log('Microphone on');
                this.player.disconnect();
                this.microphone.connect(this.filterEffect);
                this.inputFft = new p5.FFT();
                this.inputFft.setInput(this.microphone);
                
            }else{
                console.log('Microphone off');
                this.microphone.stop();
                this.microphone.disconnect();
                this.inputFft = new p5.FFT();
                this.inputFft.setInput(this.player);
                this.player.connect(this.filterEffect);
            }
        })

        this.buttons.play.mouseClicked((e)=>{ 
            console.log('Play button pressed');
            if(this.player.isLoaded() && !this.player.isPlaying())
                this.player.play();
        });

        this.buttons.stop.mouseClicked((e) =>{
            console.log('Stop button pressed');
            this.player.stop();
        });

        this.buttons.pause.mouseClicked((e) => {
            console.log('Pause button pressed');
                this.player.pause();
        });

        this.buttons.loop.mouseClicked((e) => {
            console.log('Loop button pressed');
            let isLoopBtnPressed = this.buttons.loop.elt.ariaPressed === 'true';
            this.player.setLoop(isLoopBtnPressed);
        });

        this.buttons.record.mouseClicked((e) => {
            console.log('Record button pressed');
            let isRecBtnPressed = this.buttons.record.elt.ariaPressed === 'true';
            if(isRecBtnPressed){
                //p.userStartAudio();
                this.recorder.setInput(this.masterVolumeEffect);
                this.recorder.record(this.soundFile);
                console.log('Recording');
                
            }else{
                this.recorder.stop();
                p.save(this.soundFile, 'audiofile.wav');
                console.log('Stop Recording');
            }
        });

        this.buttons.skipToEnd.mouseClicked((e) => {
            this.player.jump(this.player.duration() - 1);
        });

        this.buttons.skipToStart.mouseClicked((e) => {
            this.player.jump(0);
        });


        //binding lowpass filter controls
        this.filter.filterTypeLowPass.mouseClicked((e) => {
            console.log(`Filter - Filter Type: ${this.filter.filterTypeLowPass.value()}`);
            this.filterEffect.setType(this.filter.filterTypeLowPass.value());
        })
        this.filter.filterTypeBandPass.mouseClicked((e) => {
            console.log(`Filter - Filter Type: ${this.filter.filterTypeBandPass.value()}`);
            this.filterEffect.setType(this.filter.filterTypeBandPass.value());
        })
        this.filter.filterTypeHighPass.mouseClicked((e) => {
            console.log(`Filter - Filter Type: ${this.filter.filterTypeHighPass.value()}`);
            this.filterEffect.setType(this.filter.filterTypeHighPass.value());
        })
        this.filter.cutoffFrequency.mouseClicked((e) => {
            console.log(`Filter - Cutoff Frequency: ${this.filter.cutoffFrequency.value()}`);
            this.filterEffect.set(this.filter.cutoffFrequency.value(), this.filter.resonance.value());
        });
        this.filter.resonance.mouseClicked((e) => {
            console.log(`Filter - Resonance: ${this.filter.resonance.value()}`);
            this.filterEffect.set(this.filter.cutoffFrequency.value(), this.filter.resonance.value());
        });
        this.filter.dryWet.mouseClicked((e) => {
            console.log(`Filter - Dry/Wet: ${this.filter.dryWet.value()}`);
            this.filterEffect.drywet(this.filter.dryWet.value());
        });
        this.filter.outputLevel.mouseClicked((e) => {
            console.log(`Filter - Output Level: ${this.filter.outputLevel.value()}`);
            this.filterEffect.amp(this.filter.outputLevel.value());
        });


        //binding waveshaper distortion controls

        this.waveshaperDistortion.distortionAmount.mouseClicked((e) => {
            var oversample = this.waveshaperDistortion.oversample.value() == 0
            ? 'none'
            : this.waveshaperDistortion.oversample.value() == 1
                ? '2x'
                : '4x';
                console.log(`Waveshaper Distortion - Distortion Amount: ${this.waveshaperDistortion.distortionAmount.value()}`);
            this.waveshaperDistortionEffect.set(
                this.waveshaperDistortion.distortionAmount.value(),
                oversample
            );
        });

        this.waveshaperDistortion.oversample.mouseClicked((e) => {
            var oversample = this.waveshaperDistortion.oversample.value() == 0
            ? 'none'
            : this.waveshaperDistortion.oversample.value() == 1
                ? '2x'
                : '4x';
            console.log(`Waveshaper Distortion - Oversample: ${oversample}`);
            this.waveshaperDistortionEffect.set(
                this.waveshaperDistortion.distortionAmount.value(),
                oversample
            );
        });

        this.waveshaperDistortion.dryWet.mouseClicked((e) => {
            let dryWet = this.waveshaperDistortion.dryWet.value();
            console.log(`Waveshaper Distortion - Dry/Wet: ${dryWet}`);
            this.waveshaperDistortionEffect.drywet(dryWet);
        });

        this.waveshaperDistortion.outputLevel.mouseClicked((e) => {
            let volume = this.waveshaperDistortion.outputLevel.value();
            console.log(`Waveshaper Distortion - Volume: ${volume}`);
            this.waveshaperDistortionEffect.amp(volume)
        });
        

        //binding dynamic compressor controls

        this.dynamicCompressor.attack.mouseClicked((e) => {
            console.log(`Dynamic Compression - Attack: ${this.dynamicCompressor.attack.value()}`);
            this.dynamicCompressorEffect.set(
                this.dynamicCompressor.attack.value(),
                this.dynamicCompressor.knee.value(),
                this.dynamicCompressor.ratio.value(),
                this.dynamicCompressor.threshold.value(),
                this.dynamicCompressor.release.value()
            );
        });
        this.dynamicCompressor.knee.mouseClicked((e) => {
            console.log(`Dynamic Compression - Knee: ${this.dynamicCompressor.knee.value()}`);
            this.dynamicCompressorEffect.set(
                this.dynamicCompressor.attack.value(),
                this.dynamicCompressor.knee.value(),
                this.dynamicCompressor.ratio.value(),
                this.dynamicCompressor.threshold.value(),
                this.dynamicCompressor.release.value()
            );
        });
        this.dynamicCompressor.release.mouseClicked((e) => {
            console.log(`Dynamic Compression - Release: ${this.dynamicCompressor.release.value()}`);
            this.dynamicCompressorEffect.set(
                this.dynamicCompressor.attack.value(),
                this.dynamicCompressor.knee.value(),
                this.dynamicCompressor.ratio.value(),
                this.dynamicCompressor.threshold.value(),
                this.dynamicCompressor.release.value()
            );
        });
        this.dynamicCompressor.ratio.mouseClicked((e) => {
            console.log(`Dynamic Compression - Ratio: ${this.dynamicCompressor.ratio.value()}`);
            this.dynamicCompressorEffect.set(
                this.dynamicCompressor.attack.value(),
                this.dynamicCompressor.knee.value(),
                this.dynamicCompressor.ratio.value(),
                this.dynamicCompressor.threshold.value(),
                this.dynamicCompressor.release.value()
            );
        });
        this.dynamicCompressor.threshold.mouseClicked((e) => {
            console.log(`Dynamic Compression - Threshold: ${this.dynamicCompressor.threshold.value()}`);
            this.dynamicCompressorEffect.set(
                this.dynamicCompressor.attack.value(),
                this.dynamicCompressor.knee.value(),
                this.dynamicCompressor.ratio.value(),
                this.dynamicCompressor.threshold.value(),
                this.dynamicCompressor.release.value()
            );
        });
        this.dynamicCompressor.dryWet.mouseClicked((e) => {
            let dryWet = this.dynamicCompressor.dryWet.value();
            console.log(`Dynamic Compression - Dry/Wet: ${dryWet}`);
            this.dynamicCompressorEffect.drywet(dryWet);
        });
        this.dynamicCompressor.outputLevel.mouseClicked((e) => {
            let outputLevel = this.dynamicCompressor.outputLevel.value();
            console.log(`Dynamic Compression - Output Level: ${outputLevel}`);
            this.dynamicCompressorEffect.amp(outputLevel);
        });
        

        //binding reverb controls

        this.reverb.duration.mouseClicked((e) => {
            console.log(`Reverb - Duration: ${this.reverb.duration.value()}`);
            this.reverbEffect.set(this.reverb.duration.value(), this.reverb.decayRate.value(), this.reverb.reverse.value());
        });
        this.reverb.decayRate.mouseClicked((e) => {
            console.log(`Reverb - Decay Rate: ${this.reverb.decayRate.value()}`);
            this.reverbEffect.set(this.reverb.duration.value(), this.reverb.decayRate.value(), this.reverb.reverse.value());
        });
        this.reverb.reverse.mouseClicked((e) => {
            console.log(`Reverb - Reverse: ${this.reverb.reverse.value()}`);
            this.reverbEffect.set(this.reverb.duration.value(), this.reverb.decayRate.value(), this.reverb.reverse.value());
        });
        this.reverb.dryWet.mouseClicked(() =>{
            let dryWet = this.reverb.dryWet.value();
            console.log(`Reverb - Dry/Wet: ${dryWet}`);
            this.reverbEffect.drywet(dryWet);
        });
        this.reverb.outputLevel.mouseClicked((e) => {
            let volume = this.reverb.outputLevel.value();
            console.log(`Reverb - Volume: ${volume}`);
            this.reverbEffect.amp(volume)
        });
        
        //binding master controls

        this.master.volume.mouseClicked((e) => {
            console.log(`Gain - Volume: ${this.master.volume.value()}`);
            this.masterVolumeEffect.amp(this.master.volume.value());
        });


        //Setting up Microphone

        this.microphone = new p5.AudioIn((e) => {
            console.log(`Error accessing the microphone: ${e}`)
        });
        this.microphone.start();

        //Setting up SoundRecorder
        this.recorder = new p5.SoundRecorder();
        this.soundFile = new p5.SoundFile();

        //Setting up LowPass Filter

        this.filterEffect = new p5.Filter();
        this.filterEffect.process(
            this.player,
            this.filter.cutoffFrequency.value(),
            this.filter.resonance.value()
        );
        this.filterEffect.drywet(this.filter.dryWet.value());
        this.filterEffect.amp(this.filter.outputLevel.value());


        //Setting up WaveShaper Distortion
        this.waveshaperDistortionEffect = new p5.Distortion();
        this.waveshaperDistortionEffect.process(
            this.filterEffect,
            this.waveshaperDistortion.distortionAmount.value(),
            this.waveshaperDistortion.oversample.value() == 0
                ? 'none'
                : this.waveshaperDistortion.oversample.value() == 1
                    ? '2x'
                    : '4x'
        );
                
        this.waveshaperDistortionEffect.drywet(this.waveshaperDistortion.dryWet.value());
        this.waveshaperDistortionEffect.amp(this.waveshaperDistortion.outputLevel.value());


        //Setting up Dynamic Compressor

        this.dynamicCompressorEffect = new p5.Compressor();
        this.dynamicCompressorEffect.process(
            this.filterEffect,
            this.dynamicCompressor.attack.value(),
            this.dynamicCompressor.knee.value(),
            this.dynamicCompressor.ratio.value(),
            this.dynamicCompressor.threshold.value(),
            this.dynamicCompressor.release.value()
        );

        this.dynamicCompressorEffect.drywet(this.dynamicCompressor.dryWet.value());
        this.dynamicCompressorEffect.amp(this.dynamicCompressor.outputLevel.value());

        //Setting up Reverb Effect
        this.reverbEffect = new p5.Reverb();
        this.reverbEffect.process(
            this.dynamicCompressorEffect, 
            this.reverb.duration.value(), 
            this.reverb.decayRate.value(), 
            this.reverb.reverse.value()
        );
        
        this.reverbEffect.drywet(this.reverb.dryWet.value());
        this.reverbEffect.amp(this.reverb.outputLevel.value());


        this.waveshaperDistortionEffect.disconnect();
        this.dynamicCompressorEffect.disconnect();
        this.filterEffect.disconnect();
        this.reverbEffect.disconnect();
        this.player.disconnect();

        this.masterVolumeEffect = new p5.Gain();
        this.masterVolumeEffect.amp(this.master.volume.value());

        //Connect chain
        this.player.connect(this.filterEffect);
        this.filterEffect.connect(this.waveshaperDistortionEffect);
        this.waveshaperDistortionEffect.connect(this.dynamicCompressorEffect)
        this.dynamicCompressorEffect.connect(this.reverbEffect)
        this.reverbEffect.connect(this.masterVolumeEffect)
        this.masterVolumeEffect.connect();

        this.inputFft = new p5.FFT();
        this.inputFft.setInput(this.player);

        this.outputFft = new p5.FFT()

        let canvasContainer = p.select('#spectrumCanvas');
        this.canvasIn = p.createCanvas(canvasContainer.width, canvasContainer.width / 4);
        this.canvasIn.background(200)
        this.canvasIn.parent('spectrumCanvas');
    
    }

    p.draw = function() {
        this.canvasIn.background(255)
        let spectrumIn = this.inputFft.analyze();
        let spectrumOut = this.outputFft.analyze();
        
        p.beginShape();
        
        for (i = 0; i < spectrumIn.length; i++) {
            var x = p.map(i, 0, spectrumIn.length, 0, this.canvasIn.width / 2);
            p.vertex(x, p.map(spectrumIn[i], 0, 255, this.canvasIn.height * 0.9, 0));
        }

        
        for (i = 0; i < spectrumOut.length; i++) {
            var x = p.map(i, 0, spectrumOut.length, this.canvasIn.width / 2, this.canvasIn.width);
            p.vertex(x, p.map(spectrumOut[i], 0, 255, this.canvasIn.height * 0.9, 0));
        }
        p.endShape();


    }
}



let sketchP5Instance = new p5(sketchP5);