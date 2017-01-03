import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";

export class Size implements Interpolatable {
    constructor(public width: number, public height: number) {

    }

    public static get zero(): Size {
        return new Size(0, 0);
    }

    public interpolate(to: Interpolatable, time: number): Size {
        if (to instanceof Size) {
            return new Size(this.width.interpolate(to.width, time) as number, this.height.interpolate(to.height, time) as number);
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }

    public clone(): Size {
        return new Size(this.width, this.height);
    }
}
