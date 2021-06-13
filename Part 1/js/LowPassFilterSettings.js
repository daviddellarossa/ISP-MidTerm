class FilterSettings {
    constructor(p) {
        this.filterTypeLowPass = p.select('#lpfLowPass');
        this.filterTypeBandPass = p.select('#lpfBandPass');
        this.filterTypeHighPass = p.select('#lpfHighPass');
        
        this.cutoffFrequency = p.select('#lpfCutoffFrequencySlider');
        this.resonance = p.select('#lpfResonanceFrequency');
        this.dryWet = p.select('#lpfDryWet');
        this.outputLevel = p.select('#lpfOutputLevel');
    }
}
