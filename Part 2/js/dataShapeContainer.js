/**
 * Container and coordinator of DataShapes 
 * Instantiates the shapes to be displayed, calling the methods on the factory
 */
class DataShapeContainer{
    
    constructor(factory, width, height){
        this.width = width;
        this.height = height;
        this.shapeFactory = factory;
        this.shapes = [];
        this.dataSet;
        this.numOfShapes = 12;
        this.buildShapes();
    }

    /**
     * Builds the shapes, invoking the method in the factory
     * Then it assigns a random property from those available from Meyda
     */
    buildShapes(){
        let bufferSize = meydaAnalizer._m.bufferSize;
        let halfBufferSize = bufferSize/2;
        let sampleRate = meydaAnalizer._m.sampleRate;
        let halfSampleRate = sampleRate / 2;

        //List of properties available from Meyda and their range of values
        let dataSetProperties = [
            {p: "_rms",                  min:0, max:1},
            {p: "_zcr",                  min:0, max:halfBufferSize - 1},
            {p: "_energy",               min:0, max:bufferSize},
            {p: "_spectralCentroid",     min:0, max:halfBufferSize},
            {p: "_spectralFlatness",     min:0, max:1},
            {p: "_spectralSlope",        min:0, max:1},
            {p: "_spectralRolloff",      min:0, max:halfSampleRate},
            {p: "_spectralSkewness",     min:-1, max:1},
            {p: "_spectralKurtosis",     min:0, max:1},
            {p: "_perceptualSpread",     min:0, max:1},
            {p: "_perceptualSharpness",  min:0, max:1},
        ];

        this.shapes = [];

        //Initialize the shapes
        for(let i = 0; i < this.numOfShapes; ++i){

            //Assign randomly a Meyda property to the shape
            let rnd = Math.floor(Math.random() * dataSetProperties.length);
            let shape = this.shapeFactory.getDataShape((i + 1) * this.width/(this.numOfShapes + 1), this.height/2, this.width, this.height, i);
            shape.dataSetProperty = dataSetProperties[rnd] ;
            this.shapes.push(shape);
        }
    }

    /**
     * Replace the current factory
     * @param {dataShapeFactory} factory 
     */
    resetFactory(factory){
        this.shapeFactory = factory;
        this.buildShapes();
    }

    update(dataSet){
        this.dataSet = dataSet;

        for(let shape of this.shapes){
            shape.update(dataSet);
        }
    }

    draw(){
        for(let shape of this.shapes){
            shape.draw();
        }
    }
}