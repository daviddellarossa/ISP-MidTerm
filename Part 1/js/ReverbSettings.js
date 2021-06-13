class ReverbSettings {
    constructor(p) {
        this.duration = p.select('#revDuration');
        this.decayRate = p.select('#revDecayRate');
        this.reverse = p.select('#revReverse');
        this.dryWet = p.select('#revDryWet');
        this.outputLevel = p.select('#revOutputLevel');
    }
}
