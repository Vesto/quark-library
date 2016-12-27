import { View, ViewBacking } from "./View";
import { Control } from "./Control";
import { InteractionEvent, InteractionType } from "../events/InteractionEvent";
import { EventPhase } from "../events/Event";
import { Image } from "../../types/Image";

export interface ButtonHandler { (button: Button): void; }

export enum ButtonStyle { Borderless, Bordered }

export interface ButtonBacking extends ViewBacking {
    qk_title: string;
}

export class Button extends View implements Control {
    public static createBacking: () => ButtonBacking;
    public get buttonBacking(): ButtonBacking { return this.backing as ButtonBacking; }

    get title(): string { return this.buttonBacking.qk_title; } // TODO: Add back
    set title(newValue: string) { this.buttonBacking.qk_title = newValue; }

    public image?: Image; // TODO: Implement

    public get style(): ButtonStyle { return ButtonStyle.Bordered; } // TODO: Implement
    public set style(newValue: ButtonStyle) { /* Do nothing for now */ }

    public isEnabled: boolean;

    public buttonDownHandler?: ButtonHandler;
    public buttonUpHandler?: ButtonHandler;

    public constructor(backing?: ButtonBacking) {
        super(backing ? backing : Button.createBacking());
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
