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

    buildShapes(){
        let bufferSize = meydaAnalizer._m.bufferSize;
        let halfBufferSize = bufferSize/2;
        let sampleRate = meydaAnalizer._m.sampleRate;
        let halfSampleRate = sampleRate / 2;
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
            //{p: "loudnessTotal",        min:0, max:0},
            {p: "_perceptualSpread",     min:0, max:1},
            {p: "_perceptualSharpness",  min:0, max:1},
        ];

        this.shapes = [];
        for(let i = 0; i < this.numOfShapes; ++i){
            let rnd = Math.floor(Math.random() * dataSetProperties.length);
            let shape = this.shapeFactory.getDataShape((i + 1) * this.width/(this.numOfShapes + 1), this.height/2, this.width, this.height, i);
            shape.dataSetProperty = dataSetProperties[rnd] ;
            this.shapes.push(shape);
        }

    }

    resetFactory(factory){
        this.shapeFactory = factory;
        this.buildShapes();
    }

    update(dataSet){
        this.dataSet;
        //console.log(`New update: ${dataSet}`);

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