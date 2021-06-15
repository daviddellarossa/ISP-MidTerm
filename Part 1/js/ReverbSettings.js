class ReverbSettings {
    constructor(p) {
        this.duration = select('#revDuration');
        this.decayRate = select('#revDecayRate');
        this.reverse = select('#revReverse');
        this.dryWet = select('#revDryWet');
        this.outputLevel = select('#revOutputLevel');
    }
}
