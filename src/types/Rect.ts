import { Point } from "./Point";
import { Size } from "./Size";
import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";

export class Rect implements Interpolatable {
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
            throw new Error(
                `Can not construct Rect with given parameters: ` +
                `${pointOrX.constructor.name}, ${sizeOrY.constructor.name},` +
                `${width ? width.constructor.name : undefined}, ${height ? height.constructor.name : undefined}`
            );
        }
    }

    public static get zero(): Rect {
        return new Rect(Point.zero, Size.zero);
    }

    public get x(): number { return this.point.x; }
    public get y(): number { return this.point.y; }
    public get width(): number { return this.size.width; }
    public get height(): number { return this.size.height; }

    public get center(): Point {
        return new Point(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }

    public get bounds(): Rect {
        return new Rect(
            0, 0,
            this.width,
            this.height
        );
    }

    public interpolate(to: Interpolatable, time: number): Interpolatable {
        if (to instanceof Rect) {
            return new Rect(this.point.interpolate(to.point, time) as Point, this.size.interpolate(to.size, time) as Size);
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }
}
