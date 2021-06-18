class DataShapeContainer{
    
    constructor(factory){
        this.shapeFactory = factory;
        this.shapes = [];
        this.dataSet;
        this.numOfShapes = 12;
    }

    resetFactory(factory){
        this.shapeFactory = factory;
        this.shapes = [];
        for(let i = 0; i < this.numOfShapes; ++i){
            this.shapes.push(this.shapeFactory.getDataShape());
        }
    }

    update(dataSet){
        this.dataSet;
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