class LowPassFilterSettings {
    constructor(p) {
        this.cutoffFrequency = p.select('#lpfCutoffFrequencySlider');
        this.resonance = p.select('#lpfResonanceFrequency');
        this.dryWet = p.select('#lpfDryWet');
        this.outputLevel = p.select('#lpfOutputLevel');
    }
}
