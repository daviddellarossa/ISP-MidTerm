class WaveshaperDistortionSettings {
    constructor(p) {
        this.distortionAmount = select('#wsdDistortionAmount');
        this.oversample = select('#wsdOversample');
        this.dryWet = select('#wsdDryWet');
        this.outputLevel = select('#wsdOutputLevel');
    }
}
