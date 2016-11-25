class Shadow {
    public offset: Point;
    public blurRadius: number;
    public color: Color;

    constructor(offset: Point, blurRadius: number, color: Color) {
        this.offset = offset;
        this.blurRadius = blurRadius;
        this.color = color;
    }
}
