/**
 * Implements DataShape base class for visualizing Rectangles
 */
class RectDataShape extends DataShape{

    constructor(x, y, width, height, index){
        super(x, y, width, height, index);
        this.buffer=[];
        this.bufferSize = 5;
    }

    draw(){
        noFill();
        
        //Factor based on Chroma
        let chromaFactor = this.dataSet.getChroma(this.index); 
        
        //Factor based on PowerSpectrum
        let powerFactor = this.dataSet.getPowerSpectrum((this.dataSet.powerSpectrum.length/12) * this.index);
        let powerFactorNorm = map(powerFactor, 0, 12000, 0, 1);

        //Read the property assigned to the instance
        let propValue = this.dataSet[this.dataSetProperty.p];
        
        //Set the Colour for the border of the shape
        //Default is Red. If the assigned property's value is not undefined or null, use that for calculating the colour
        let shapeColor = color(0, 100, 100);

        if(propValue){
            let value = map(propValue, this.dataSetProperty.min, this.dataSetProperty.max, 0, 100)
            shapeColor = color(value, 100, map(powerFactorNorm, 0, 1, 30, 100));
        }

        //Calculate the sizes of the shape
        let shapeWidth = this.width * chromaFactor/2;
        let shapeHeight = this.width * chromaFactor/10 * (1 + log(map(powerFactor, 0, 24000, 1, 100)));
        

        //Add the parameters to the buffer
        this.buffer.push([this.x, this.y, shapeWidth, shapeHeight, shapeColor]);
        
        //Control the buffer size
        if(this.buffer.length > this.bufferSize){
            this.buffer.shift();
        }


        //Draw all shapes in the buffer, scaling the size and the strokeWidth and varying the stroke colour
        for(let i = 0; i < this.buffer.length ; ++i){
            let item = this.buffer[i];
            let scalingFactor = 1 + 0.5* i;
            let clr = color(hue(item[4]), saturation(item[4]), lightness(item[4]) / scalingFactor * 2);

            stroke(clr);
            strokeWeight(this.buffer.length - i);
            rect(item[0], item[1], item[2] * scalingFactor, item[3] * scalingFactor);
        }

    }
}