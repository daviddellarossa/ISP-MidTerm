/**
 * References for the HTML controls for the Filter effect
 */
class FilterSettings {
    constructor(p) {
        this.filterTypeLowPass = select('#lpfLowPass');
        this.filterTypeBandPass = select('#lpfBandPass');
        this.filterTypeHighPass = select('#lpfHighPass');
        this.cutoffFrequency = select('#lpfCutoffFrequencySlider');
        this.resonance = select('#lpfResonanceFrequency');
        this.dryWet = select('#lpfDryWet');
        this.outputLevel = select('#lpfOutputLevel');
    }
}
