export class Size {
    constructor(public width: number, public height: number) {

    }

    public static get zero(): Size {
        return new Size(0, 0);
    }
}
