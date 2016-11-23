class Color {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;

    public get qkColor(): QKColor {
        return new QKColor(this.red, this.green, this.blue, this.alpha);
    }

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public static fromQKColor(qkColor: QKColor): Color {
        return new Color(qkColor.red, qkColor.green, qkColor.blue, qkColor.alpha);
    }
}
