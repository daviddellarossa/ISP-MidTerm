class PolyDataShapeFactory extends DataShapeFactory{
    constructor(npoints){
        super();
        this.npoints = npoints;
    }
    getDataShape(x, y, width, height, index){
        let shape = new PolyDataShape(x, y, width, height, index);
        shape.npoints = this.npoints;
        return shape;
    };
}