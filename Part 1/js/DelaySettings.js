class DelaySettings {
    constructor(p) {
        this.delayTypeDefault = select('#delTypeDefault');
        this.delayTypePingPong = select('#delTypePingPong');

        this.delayTime = select('#delTime');
        this.feedback = select('#delFeedback');
        this.lowPass = select('#delLowPass');
        this.dryWet = select('#delDryWet');
        this.outputLevel = select('#delOutputLevel');
    }
}
