class Rect {
    public point: Point;
    public size: Size;

    public get qkRect() {
        return new QKRect(this.point.qkPoint, this.size.qkSize);
    }

    constructor(point: Point, size: Size) {
        this.point = point;
        this.size = size;
    }

    public static fromQKRect(qkRect: QKRect): Rect {
        return new Rect(Point.fromQKPoint(qkRect.origin), Size.fromQKSize(qkRect.size));
    }
}
