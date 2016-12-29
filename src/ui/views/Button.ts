import { View, ViewBacking } from "./View";
import { Control } from "./Control";
import { InteractionEvent, InteractionType } from "../events/InteractionEvent";
import { EventPhase } from "../events/Event";
import { Image } from "../../types/Image";

export interface ButtonHandler { (button: Button): void; }

export enum ButtonStyle { Borderless, Bordered }

export interface ButtonBacking extends ViewBacking {
    qk_title: string;
    qk_isEnabled: boolean;
    qk_isEmphasized: boolean;
}

export class Button extends View implements Control {
    public static createBacking: () => ButtonBacking;
    public get buttonBacking(): ButtonBacking { return this.backing as ButtonBacking; }

    get title(): string { return this.buttonBacking.qk_title; } // TODO: Add back
    set title(newValue: string) { this.buttonBacking.qk_title = newValue; }

    public get isEnabled(): boolean { return this.buttonBacking.qk_isEnabled; }
    public set isEnabled(enabled: boolean) { this.buttonBacking.qk_isEnabled = enabled; }

    public get isEmphasized(): boolean { return this.buttonBacking.qk_isEmphasized; }
    public set isEmphasized(emphasized: boolean) { this.buttonBacking.qk_isEmphasized = emphasized; }

    public buttonDownHandler?: ButtonHandler;
    public buttonUpHandler?: ButtonHandler;

    public constructor(backing?: ButtonBacking) {
        super(backing ? backing : Button.createBacking());

        // Set default values
        this.title = "";
        this.isEnabled = true;
        this.isEmphasized = false;
    }

    public interactionEvent(event: InteractionEvent): boolean {
        // Check if it should absorb the event and call the callbacks
        if (this.isEnabled && event.type === InteractionType.LeftMouse) {
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
