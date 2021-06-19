class RectDataShapeFactory extends DataShapeFactory{
    
    constructor(){
        super();
    }

    getDataShape(x, y, width, height, index){
        return new RectDataShape(x, y, width, height, index);
    }
}