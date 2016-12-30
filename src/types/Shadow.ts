import { Color } from "./Color";
import { Point } from "./Point";
import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";
import { Cloneable } from "../utils/Cloneable";

export class Shadow implements Interpolatable, Cloneable {
    constructor(public offset: Point, public blurRadius: number, public color: Color) {

    }

    public interpolate(to: Interpolatable, time: number): Interpolatable {
        if (to instanceof Shadow) {
            return new Shadow(
                this.offset.interpolate(to.offset, time) as Point,
                this.blurRadius.interpolate(to.blurRadius, time) as number,
                this.color.interpolate(to.color, time) as Color
            );
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }

    public clone(): Cloneable {
        return new Shadow(this.offset.clone() as Point, this.blurRadius, this.color.clone() as Color);
    }
}
