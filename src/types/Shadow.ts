import { Color } from "./Color";
import { Point } from "./Point";

export class Shadow {
    constructor(public offset: Point, public blurRadius: number, public color: Color) {

    }
}
