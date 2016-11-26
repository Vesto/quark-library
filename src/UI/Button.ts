/// <reference path="./View.ts" />

class Button extends View {
    protected get button(): QKButton { return this.view as QKButton; }

    public constructor() {
        super(new QKButton(), true);
    }

    get title(): string { return this.button.jsTitle; }
    set title(newValue: string) { this.button.jsTitle = newValue; }
}
