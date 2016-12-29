import { Interpolatable, InvalidInterpolatableDestination } from "../utils/Interpolatable";

export class Color implements Interpolatable {
    constructor(public red: number, public green: number, public blue: number, public alpha: number) {

    }

    public toHex(): number {
        let r = Math.round(this.red * 255) & 0xFF;
        let g = Math.round(this.green * 255) & 0xFF;
        let b = Math.round(this.blue * 255) & 0xFF;
        let a = Math.round(this.alpha * 255) & 0xFF;

        return (r << 24) | (g << 16) | (b << 8) | (a);
    }

    public interpolate(to: Interpolatable, time: number): Interpolatable {
        if (to instanceof Color) {
            return new Color(
                this.red.interpolate(to.red, time) as number,
                this.green.interpolate(to.green, time) as number,
                this.blue.interpolate(to.blue, time) as number,
                this.alpha.interpolate(to.alpha, time) as number
            );
        } else {
            throw new InvalidInterpolatableDestination(this, to);
        }
    }
}
