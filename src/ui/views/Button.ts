import { View } from "./View";
import { Image } from "../../types/Image";
import { Control } from "./Control";

import { QKButton } from "quark-native";
import { InteractionEvent, InteractionType } from "../events/InteractionEvent";
import { EventPhase } from "../events/Event";

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

    public buttonDownHandler?: ButtonHandler; // TODO: Implement // TODO: Manually call these from View events
    public buttonUpHandler?: ButtonHandler; // TODO: Implement

    public constructor() {
        super(new QKButton());
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Check if it should absorb the event and call the callbacks
        if (event.type === InteractionType.LeftMouse) {
            if (event.phase === EventPhase.Began && typeof this.buttonDownHandler !== "undefined") {
                this.buttonDownHandler(this);
                return true;
            } else if (event.phase === EventPhase.Ended && typeof this.buttonUpHandler !== "undefined") {
                this.buttonUpHandler(this);
                return true;
            }
        }

        // Otherwise let the superclass handle it
        return super.interactionEvent(event);
    }
}
