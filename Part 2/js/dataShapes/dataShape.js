class DataShape{
    constructor(p5Context, x, y, height, width) {
        this.p5Context = p5Context
        this.dataSet;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    update(dataSet){
        this.dataSet = dataSet;
    }

    draw(){ }
}