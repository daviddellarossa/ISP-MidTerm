class DynamicCompressorSettings {
    constructor(p) {
        this.attack = select('#dcAttack');
        this.knee = select('#dcKnee');
        this.release = select('#dcRelease');
        this.ratio = select('#dcRatio');
        this.threshold = select('#dcThreshold');
        this.dryWet = select('#dcDryWet');
        this.outputLevel = select('#dcOutputLevel');
    }
}
