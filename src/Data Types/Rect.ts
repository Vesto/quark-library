class Rect {
    point: Point;
    size: Size;

    get qkRect() {
        return QKRect(point.qkPoint, size.qkSize)
    }

    constructor(point: Point, size: Size) {
        this.point = point;
        this.size = size;
    }

    static fromQKRect(qkRect: QKRect): Rect {
        // return new this()
    }
}
