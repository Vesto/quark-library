import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";

export class Point implements Interpolatable {
    constructor(public x: number, public y: number) {

    }

    public static get zero(): Point {
        return new Point(0, 0);
    }

    public equals(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    public inverse(): Point {
        return new Point(-this.x, -this.y);
    }

    public add(point: Point): Point {
        return new Point(this.x + point.x, this.y + point.y);
    }

    public subtract(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y);
    }

    public multiply(point: Point): Point;
    public multiply(magnitude: number): Point;
    public multiply(pointOrMagnitude: Point | number): Point {
        if (pointOrMagnitude instanceof Point) {
            return new Point(this.x * pointOrMagnitude.x, this.y * pointOrMagnitude.y);
        } else {
            return new Point(this.x * pointOrMagnitude, this.y * pointOrMagnitude);
        }
    }

    public interpolate(to: Interpolatable, time: number): Interpolatable {
        if (to instanceof Point) {
            return new Point(this.x.interpolate(to.x, time) as number, this.y.interpolate(to.y, time) as number);
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }
}
