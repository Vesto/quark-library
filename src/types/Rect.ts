import { Point } from "./Point";
import { Size } from "./Size";

export class Rect {
    public point: Point;
    public size: Size;

    public constructor(point: Point, size: Size);
    public constructor(x: number, y: number, width: number, height: number);
    public constructor(pointOrX: Point | number, sizeOrY: Size | number, width?: number, height?: number) {
        if (pointOrX instanceof Point && sizeOrY instanceof Size) {
            this.point = pointOrX;
            this.size = sizeOrY;
        } else if (
            typeof pointOrX === "number" && typeof sizeOrY === "number" &&
            typeof width !== "undefined" && typeof height !== "undefined"
        ) {
            this.point = new Point(pointOrX, sizeOrY);
            this.size = new Size(width, height);
        } else {
            throw new Error(`Can not instantiateRect with given parameters. ${pointOrX}, ${sizeOrY}, ${width}, ${height}`);
        }
    }

    public static get zero(): Rect {
        return new Rect(Point.zero, Size.zero);
    }

    get x(): number { return this.point.x; }
    get y(): number { return this.point.y; }
    get width(): number { return this.size.width; }
    get height(): number { return this.size.height; }

    get center(): Point {
        return new Point(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }

    get bounds(): Rect {
        return new Rect(
            0, 0,
            this.width - this.x,
            this.height - this.y
        );
    }
}
