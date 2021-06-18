class EllipseDataShape extends DataShape{
    constructor(){
        super();
    }

    draw(){
        ellipse(this.x, this.y, this.width, this.height);
    }
}