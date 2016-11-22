class Point {
    x: number;
    y: number;

    get qkPoint() {
        return QKPoint(x, y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromQKPoint(qkPoint: QKPoint): Point {
        return new Point(qkPoint.x, qkPoint.y);
    }
}
