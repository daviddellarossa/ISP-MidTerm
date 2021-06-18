class RectDataShapeFactory extends DataShapeFactory{
    constructor(){
        super();
    }
    getDataShape(x, y, width, height){
        return new RectDataShape(x, y, width, height);
    };
}