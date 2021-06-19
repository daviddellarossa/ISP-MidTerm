class EllipseDataShapeFactory extends DataShapeFactory{

    constructor(){
        super();
    }
    
    getDataShape(x, y, width, height, index){
        return new EllipseDataShape(x, y, width, height, index);
    }
}