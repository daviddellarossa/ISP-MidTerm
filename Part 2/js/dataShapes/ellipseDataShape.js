class EllipseDataShape extends DataShape{
    constructor(x, y, width, height, index){
        super(null, x, y, width, height, index);
    }

    draw(){
        ellipse(this.x, this.y, this.width, this.height);
    }
}