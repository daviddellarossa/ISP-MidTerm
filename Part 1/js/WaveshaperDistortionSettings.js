class WaveshaperDistortionSettings {
    constructor(p) {
        this.distortionAmount = p.select('#wsdDistortionAmount');
        this.oversample = p.select('#wsdOversample');
        this.dryWet = p.select('#wsdDryWet');
        this.outputLevel = p.select('#wsdOutputLevel');
    }
}
