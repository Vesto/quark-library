import { Point } from "./Point";
import { Size } from "./Size";

export class Rect {
    public point: Point;
    public size: Size;

    get x(): number { return this.point.x; }
    get y(): number { return this.point.y; }
    get width(): number { return this.size.width; }
    get height(): number { return this.size.height; }

    public constructor(point: Point, size: Size);
    public constructor(x: number, y: number, width: number, height: number);
    public constructor(pointOrX: Point | number, sizeOrY: Size | number, width?: number, height?: number) {
        if (pointOrX instanceof Point && sizeOrY instanceof Size) {
            this.point = pointOrX;
            this.size = sizeOrY;
        } else if (typeof pointOrX === "number" && typeof sizeOrY === "number" && width && height) {
            this.point = new Point(pointOrX, sizeOrY);
            this.size = new Size(width, height);
        } else {
            throw new Error("Can not instantiate Rect with given parameters.");
        }
    }
}
