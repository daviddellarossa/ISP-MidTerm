class DelaySettings {
    constructor(p) {
        this.delayTypeDefault = p.select('#delTypeDefault');
        this.delayTypePingPong = p.select('#delTypePingPong');

        this.delayTime = p.select('#delTime');
        this.feedback = p.select('#delFeedback');
        this.lowPass = p.select('#delLowPass');
        this.dryWet = p.select('#delDryWet');
        this.outputLevel = p.select('#delOutputLevel');
    }
}
