class DynamicCompressorSettings {
    constructor(p) {
        this.attack = p.select('#dcAttack');
        this.knee = p.select('#dcKnee');
        this.release = p.select('#dcRelease');
        this.ratio = p.select('#dcRatio');
        this.threshold = p.select('#dcThreshold');
        this.dryWet = p.select('#dcDryWet');
        this.outputLevel = p.select('#dcOutputLevel');
    }
}
