import { View } from "./View";
import { Image } from "../../types/Image";
import { Control } from "./Control";

import { QKButton } from "quark-native";

export interface ButtonHandler { (button: Button): void; }

export enum ButtonStyle { Borderless, Bordered }

export class Button extends View implements Control {
    protected get button(): QKButton { return this.view as QKButton; }

    get title(): string { return this.button.jsTitle; }
    set title(newValue: string) { this.button.jsTitle = newValue; }

    public image?: Image; // TODO: Implement

    public get style(): ButtonStyle { return ButtonStyle.Bordered; } // TODO: Implement
    public set style(newValue: ButtonStyle) { /* Do nothing for now */ }

    public isEnabled: boolean;

    public buttonDownHandler?: ButtonHandler; // TODO: Implement
    public buttonUpHandler?: ButtonHandler; // TODO: Implement

    public constructor() {
        super(new QKButton(), true);
    }
}
