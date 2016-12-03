import { QKButton } from "../../bridge/Views";

import { View } from "./View";
import { Image } from "../../types/Image";
import { Control } from "./Control";

export interface ButtonHandler { (button: Button): void; }

export class Button extends View implements Control {
    protected get button(): QKButton { return this.view as QKButton; }

    get title(): string { return this.button.jsTitle; }
    set title(newValue: string) { this.button.jsTitle = newValue; }

    public image?: Image;

    public isEnabled: boolean;

    public buttonDownHandler?: ButtonHandler;
    public buttonUpHandler?: ButtonHandler;

    public constructor() {
        super(new QKButton(), true);
    }
}
