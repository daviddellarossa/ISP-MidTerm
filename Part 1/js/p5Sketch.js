
let sketchP5 = function(p){

    this.song;
    this.test;

    this.buttons = function(){
        this.play = null;
        this.stop = null;
        this.pause = null;
        this.loop = null;
        this.record = null;
        this.skipToEnd = null;
        this.skipToStart = null;
    }

    this.lowPassFilter = function(){
        this.cutoffFrequency = null;
        this.resonance = null;
        this.dryWet = null;
        this.outputLevel = null;
    }

    this.waveshaperDistortion = function(){
        this.distortionAmount = null;
        this.oversample = null;
        this.dryWet = null;
        this.outputLevel = null;
    }

    this.dynamicCompressor = function(){
        this.attack = null;
        this.knee = null;
        this.release = null;
        this.ratio = null;
        this.threshold = null;
        this.dryWet = null;
        this.outputLevel = null;
    }

    this.reverb = function(){
        this.duration = null;
        this.decayRate = null;
        this.reverse = null;
        this.dryWet = null;
        this.outputLevel = null;
    }

    this.master = function(){
        this.volume = null;
    }

    let volumeSlider;
    p.setup = function() {

        // let canvas = p.createCanvas(canvasContainer.size().width, canvasContainer.size().height);
        // canvas.parent("content");
        song = p.loadSound('./sounds/sound1.mp3');

        //binding buttons
        buttons.play = p.select('#playBtn');
        buttons.stop = p.select('#stopBtn')
        buttons.pause = p.select('#pauseBtn')
        buttons.loop = p.select('#loopBtn')
        buttons.record = p.select('#recordBtn')
        buttons.skipToEnd = p.select('#skipToEndBtn')
        buttons.skipToStart = p.select('#skipToStartBtn')
        
        buttons.play.mouseClicked(play);
        buttons.stop.mouseClicked(stop);
        buttons.pause.mouseClicked(pause);
        buttons.loop.mouseClicked(loop);
        buttons.record.mouseClicked(record);
        buttons.skipToEnd.mouseClicked(skipToEnd);
        buttons.skipToStart.mouseClicked(skipToStart);


        //binding lowpass filter controls

        lowPassFilter.cutoffFrequency = p.select('#lpfCutoffFrequencySlider');
        lowPassFilter.resonance = p.select('#lpfResonanceFrequency');
        lowPassFilter.dryWet = p.select('#lpfDryWet');
        lowPassFilter.outputLevel = p.select('#lpfOutputLevel');

        lowPassFilter.cutoffFrequency.mouseClicked(lpfCutoffFrequencyChanged);
        lowPassFilter.resonance.mouseClicked(lpfResonanceChanged);
        lowPassFilter.dryWet.mouseClicked(lpfDryWetChanged);
        lowPassFilter.outputLevel.mouseClicked(lpfOutputLevelChanged);



        //binding waveshaper distortion controls

        waveshaperDistortion.distortionAmount = p.select('#wsdDistortionAmount');
        waveshaperDistortion.oversample = p.select('#wsdOversample');
        waveshaperDistortion.dryWet = p.select('#wsdDryWet');
        waveshaperDistortion.outputLevel = p.select('#wsdOutputLevel');

        waveshaperDistortion.distortionAmount.mouseClicked(wdDistortionAmountChanged);
        waveshaperDistortion.oversample.mouseClicked(wdOversampleChanged);
        waveshaperDistortion.dryWet.mouseClicked(wdDryWetChanged);
        waveshaperDistortion.outputLevel.mouseClicked(wdOutputLevelChanged);
        


        //binding dynamic compressor controls

        dynamicCompressor.attack = p.select('#dcAttack');
        dynamicCompressor.knee = p.select('#dcKnee');
        dynamicCompressor.release = p.select('#dcRelease');
        dynamicCompressor.ratio = p.select('#dcRatio');
        dynamicCompressor.threshold = p.select('#dcThreshold');
        dynamicCompressor.dryWet = p.select('#dcDryWet');
        dynamicCompressor.outputLevel = p.select('#dcOutputLevel');

        dynamicCompressor.attack.mouseClicked(dcAttackChanged);
        dynamicCompressor.knee.mouseClicked(dcKneeChanged);
        dynamicCompressor.release.mouseClicked(dcReleaseChanged);
        dynamicCompressor.ratio.mouseClicked(dcRatioChanged);
        dynamicCompressor.threshold.mouseClicked(dcThresholdChanged);
        dynamicCompressor.dryWet.mouseClicked(dcDryWetChanged);
        dynamicCompressor.outputLevel.mouseClicked(dcOutputLevelChanged);
        

        //binding reverb controls

        reverb.duration = p.select('#revDuration');
        reverb.decayRate = p.select('#revDecayRate');
        reverb.reverse = p.select('#revReverse')
        reverb.dryWet = p.select('#revDryWet');
        reverb.outputLevel = p.select('#revOutputLevel');

        reverb.duration.mouseClicked(revDurationChanged);
        reverb.decayRate.mouseClicked(revDecayRateChanged);
        reverb.reverse.mouseClicked(revReverseChanged)
        reverb.dryWet.mouseClicked(revDryWetChanged);
        reverb.outputLevel.mouseClicked(revOutputLevelChanged);


        
        //binding master controls
        master.volume = p.select('#mstVolume');

        master.volume.mouseClicked(mstVolumeChanged);


        
    }



    p.draw = function() {

    }


    //Buttons event handlers
    function play(){
        console.log('Play button pressed');
    }

    function stop(){
        console.log('Stop button pressed');
    }

    function loop(){
        console.log('Loop button pressed');
    }

    function pause(){
        console.log('Pause button pressed');
    }

    function skipToStart(){
        console.log('SkipToStart button pressed');
    }

    function skipToEnd(){
        console.log('SkipToEnd button pressed');
    }

    function record(){
        console.log('Record button pressed');
    }


    //Lowpass filter event handlers
    function lpfCutoffFrequencyChanged(){
        console.log(lowPassFilter.cutoffFrequency.value());
    }
    function lpfResonanceChanged(){}
    function lpfDryWetChanged(){}
    function lpfOutputLevelChanged(){}


    //waveshaper distortion event handlers
    function wdDistortionAmountChanged(){}
    function wdOversampleChanged(){}
    function wdDryWetChanged(){}
    function wdOutputLevelChanged(){}

    //dynamic compressor event handlers
    function dcAttackChanged(){}
    function dcKneeChanged(){}
    function dcReleaseChanged(){}
    function dcRatioChanged(){}
    function dcThresholdChanged(){}
    function dcDryWetChanged(){}
    function dcOutputLevelChanged(){}

    //reverb event handlers
    function revDurationChanged(){}
    function revDecayRateChanged(){}
    function revReverseChanged(){}
    function revDryWetChanged(){}
    function revOutputLevelChanged(){}

    //master volume event handlers
    function mstVolumeChanged(){}
}



let sketchP5Instance = new p5(sketchP5);