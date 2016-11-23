class Size {
    public width: number;
    public height: number;

    public get qkSize() {
        return new QKSize(this.width, this.height);
    }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public static fromQKSize(qkSize: QKSize): Size {
        return new Size(qkSize.width, qkSize.height);
    }
}
