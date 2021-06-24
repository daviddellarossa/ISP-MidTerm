/**
 * Contains references to the HTML buttons, for use in p5js sketch
 */
class ButtonsReferences {
    constructor(p) {
        this.mic = select('#micBtn');
        this.play = select('#playBtn');
        this.stop = select('#stopBtn');
        this.pause = select('#pauseBtn');
        this.loop = select('#loopBtn');
        this.record = select('#recordBtn');
        this.skipToEnd = select('#skipToEndBtn');
        this.skipToStart = select('#skipToStartBtn');
    }
}
