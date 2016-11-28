import { Point } from "./Point";
import { Size } from "./Size";

export class Rect {
    public point: Point;
    public size: Size;

    constructor(point: Point, size: Size) {
        this.point = point;
        this.size = size;
    }
}
