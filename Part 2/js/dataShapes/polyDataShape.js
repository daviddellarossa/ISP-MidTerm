//Implements DataShape base class for visualizing Polygons
class PolyDataShape extends DataShape{

    constructor(x, y, width, height, index){
        super(x, y, width, height, index);
        this.buffer=[];
        this.bufferSize = 5;
        this.npoints = 3;
    }

    draw(){
        noFill();
        let chromaFactor = this.dataSet.getChroma(this.index); 
        let powerFactor = this.dataSet.getPowerSpectrum((this.dataSet.powerSpectrum.length/12) * this.index);
        let powerFactorNorm = map(powerFactor, 0, 12000, 0, 1);

        let propValue = this.dataSet[this.dataSetProperty.p];
        let rectColor = color(0, 100, 100);

        if(propValue){
            let value = map(propValue, this.dataSetProperty.min, this.dataSetProperty.max, 0, 100)
            rectColor = color(value, 100, map(powerFactorNorm, 0, 1, 30, 100));
        }

        let rectWidth = this.width * chromaFactor/5;
        let rectHeight = this.width * chromaFactor/10 * (1 + log(map(powerFactor, 0, 24000, 1, 100)));
        

        this.buffer.push([this.x, this.y, rectWidth, rectHeight, rectColor]);
        if(this.buffer.length > this.bufferSize){
            this.buffer.shift();
        }

        for(let i = 0; i < this.buffer.length ; ++i){
            let item = this.buffer[i];
            let scalingFactor = 1 + 0.5* i;
            let clr = color(hue(item[4]), saturation(item[4]), lightness(item[4]) / scalingFactor * 2);

            stroke(clr);
            strokeWeight(this.buffer.length - i);
            this.polygon(item[0], item[1], item[2] * scalingFactor, item[3] * scalingFactor)
        }
    }

    //Polygon function adapted from https://p5js.org/examples/form-regular-polygon.html
    //Draws a polygon 
    polygon(x, y, width, height) {
        let angle = TWO_PI / this.npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
          let sx = x + cos(a - HALF_PI) * width;
          let sy = y + sin(a - HALF_PI) * height;
          vertex(sx, sy);
        }
        endShape(CLOSE);
      }
}