
interface QKRect {
    readonly origin: QKPoint;
    readonly size: QKSize;

    constructor(origin: QKPoint, size: QKSize)
}

interface QKPoint {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number)
}

interface QKSize {
    readonly width: number;
    readonly height: number;

    constructor(width: nubmer, height: number)
}

interface QKShadow {
    readonly offset: QKPoint;
    readonly blurRadius: number;
    readonly color: QKColor;

    constructor(offset: QKColor, blurRadius: number, color: QKColor)
}

interface QKColor {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number)
}
