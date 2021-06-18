class EllipseDataShapeFactory extends DataShapeFactory{
    constructor(){
        super();
    }
    getDataShape(x, y, width, height){
        return new EllipseDataShape(x, y, width, height);
    };
}