declare class QKRect {
    origin: QKPoint;
    size: QKSize;

    constructor(origin: QKPoint, size: QKSize);
}

declare class QKPoint {
    x: number;
    y: number;

    constructor(x: number, y: number);
}

declare class QKSize {
    width: number;
    height: number;

    constructor(width: number, height: number);
}

declare class QKShadow {
    offset: QKPoint;
    blurRadius: number;
    color: QKColor;

    constructor(offset: QKColor, blurRadius: number, color: QKColor);
}

declare class QKColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number);
}