class Size {
    width: number;
    height: number;

    get qkSize() {
        return new QKSize(width, height);
    }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    static fromQKSize(qkSize: QKSize): Size {
        return new Size(qkSize.x, qkSize.y);
    }
}
