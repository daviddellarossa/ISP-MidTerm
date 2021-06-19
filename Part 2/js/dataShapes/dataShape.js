class DataShape{
    constructor(p5Context, x, y, height, width, index) {
        //this.p5Context = p5Context
        this.index = index;
        this.dataSet = new DataSet();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.dataSetProperty;
    }
    update(dataSet){
        this.dataSet = dataSet;
    }

    draw(){ }
}