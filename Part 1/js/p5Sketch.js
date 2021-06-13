
//let sound;
let sketchP5 = function(p){

    this.player;
    this.reverbEffect;

    p.preload = function() {
        p.soundFormats('mp3', 'ogg');
        this.player = p.loadSound('./sounds/sound1.mp3', () => {console.log('File loaded')});
        this.player.disconnect();
      }


    p.setup = function() {
        this.reverb = new ReverbSettings(p);
        this.buttons = new ButtonsReferences(p);
        this.lowPassFilter = new LowPassFilterSettings(p);
        this.waveshaperDistortion = new WaveshaperDistortionSettings(p);
        this.dynamicCompressor = new DynamicCompressorSettings(p);
        this.master = new MasterSettings(p);

        // //binding buttons
        
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

        });

        this.buttons.skipToEnd.mouseClicked((e) => {
            this.player.jump(this.player.duration() - 1);
        });

        this.buttons.skipToStart.mouseClicked((e) => {
            this.player.jump(0);
        });


        //binding lowpass filter controls

        this.lowPassFilter.cutoffFrequency.mouseClicked((e) => {
            console.log(`LowPass Filter - Cutoff Frequency: ${this.lowPassFilter.cutoffFrequency.value()}`);
            this.lowPassFilterEffect.set(this.lowPassFilter.cutoffFrequency.value(), this.lowPassFilter.resonance.value());
        });
        this.lowPassFilter.resonance.mouseClicked((e) => {
            console.log(`LowPass Filter - Resonance: ${this.lowPassFilter.resonance.value()}`);
            this.lowPassFilterEffect.set(this.lowPassFilter.cutoffFrequency.value(), this.lowPassFilter.resonance.value());
        });
        this.lowPassFilter.dryWet.mouseClicked((e) => {
            console.log(`LowPass Filter - Dry/Wet: ${this.lowPassFilter.dryWet.value()}`);
            this.lowPassFilterEffect.drywet(this.lowPassFilter.dryWet.value());
        });
        this.lowPassFilter.outputLevel.mouseClicked((e) => {
            console.log(`LowPass Filter - Output Level: ${this.lowPassFilter.outputLevel.value()}`);
            this.lowPassFilterEffect.amp(this.lowPassFilter.outputLevel.value());
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

        //Setting up LowPass Filter

        

        this.lowPassFilterEffect = new p5.LowPass();
        this.lowPassFilterEffect.process(
            this.player,
            this.lowPassFilter.cutoffFrequency.value(),
            this.lowPassFilter.resonance.value()
        );
        this.lowPassFilterEffect.drywet(this.lowPassFilter.dryWet.value());
        this.lowPassFilterEffect.amp(this.lowPassFilter.outputLevel.value());


        //Setting up WaveShaper Distortion
        this.waveshaperDistortionEffect = new p5.Distortion();
        this.waveshaperDistortionEffect.process(
            this.lowPassFilterEffect,
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
            this.lowPassFilterEffect,
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
        this.lowPassFilterEffect.disconnect();
        this.reverbEffect.disconnect();
        this.player.disconnect();

        this.masterVolumeEffect = new p5.Gain();
        this.masterVolumeEffect.amp(this.master.volume.value());

        //Connect chain
        this.player.connect(this.lowPassFilterEffect);
        this.lowPassFilterEffect.connect(this.waveshaperDistortionEffect);
        this.waveshaperDistortionEffect.connect(this.dynamicCompressorEffect)
        this.dynamicCompressorEffect.connect(this.reverbEffect)
        this.reverbEffect.connect(this.masterVolumeEffect)
        this.masterVolumeEffect.connect();

        this.inputFft = new p5.FFT();
        this.inputFft.setInput(this.player);

        this.outputFft = new p5.FFT()
        //this.inputFft.setInput(this.masterVolumeEffect);

        let canvasContainer = p.select('#spectrumCanvas');
        this.canvasIn = p.createCanvas(canvasContainer.width, canvasContainer.width / 4);
        this.canvasIn.background(200)
        this.canvasIn.parent('spectrumCanvas');

        // this.canvasOut = p.createCanvas(200, 200);
        // this.canvasOut.background(0, 100, 0);
        // this.canvasOut.parent('spectrumOutCanvas');
    
    }

    p.draw = function() {
        //let canvasContainer = p.select('#spectrumCanvas');
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