class Shadow {
    public offset: Point;
    public blurRadius: number;
    public color: Color;

    public get qkShadow(): QKShadow {
        return new QKShadow(
            this.offset.qkPoint,
            this.blurRadius,
            this.color.qkColor
        );
    }

    constructor(offset: Point, blurRadius: number, color: Color) {
        this.offset = offset;
        this.blurRadius = blurRadius;
        this.color = color;
    }

    public static fromQKShadow(qkShadow: QKShadow): Shadow {
        return new Shadow(
            Point.fromQKPoint(qkShadow.offset),
            qkShadow.blurRadius,
            Color.fromQKColor(qkShadow.color)
        );
    }
}
