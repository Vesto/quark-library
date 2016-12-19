export class Color {
    constructor(public red: number, public green: number, public blue: number, public alpha: number) {

    }

    public toHex(): number {
        let r = Math.round(this.red * 255) & 0xFF;
        let g = Math.round(this.green * 255) & 0xFF;
        let b = Math.round(this.blue * 255) & 0xFF;
        let a = Math.round(this.alpha * 255) & 0xFF;

        return (r << 24) | (g << 16) | (b << 8) | (a);
    }
}
