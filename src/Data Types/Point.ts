class Point {
    public x: number;
    public y: number;

    get qkPoint() {
        return new QKPoint(this.x, this.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static fromQKPoint(qkPoint: QKPoint): Point {
        return new Point(qkPoint.x, qkPoint.y);
    }
}
