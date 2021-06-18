class RectDataShape extends DataShape{
    constructor(){
        super();
    }

    draw(){
        rect(this.x, this.y, this.width, this.height);
    }
}