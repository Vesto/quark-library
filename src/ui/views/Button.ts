import { View, ViewBacking } from "./View";
import { Control, ControlBacking } from "./Control";
import { InteractionEvent, InteractionType } from "../events/InteractionEvent";
import { EventPhase } from "../events/Event";
import { Image } from "../../types/Image";

export interface ButtonHandler { (button: Button): void; }

export enum ButtonStyle { Borderless, Bordered }

export interface ButtonBacking extends ViewBacking, ControlBacking {
    qk_setTitle(title: string): void;
    qk_setIsEmphasized(emphasized: boolean): void;
}

export class Button extends View implements Control {
    public static createBacking: () => ButtonBacking;
    public get buttonBacking(): ButtonBacking { return this.backing as ButtonBacking; }

    private _title: string;
    get title(): string { return this._title; }
    set title(title: string) { this._title = title; this.buttonBacking.qk_setTitle(title); }

    private _isEnabled: boolean;
    public get isEnabled(): boolean { return this._isEnabled; }
    public set isEnabled(enabled: boolean) { this._isEnabled = enabled; this.buttonBacking.qk_setIsEnabled(enabled); }

    private _isEmphasized: boolean;
    public get isEmphasized(): boolean { return this._isEmphasized; }
    public set isEmphasized(emphasized: boolean) { this._isEmphasized = emphasized; this.buttonBacking.qk_setIsEmphasized(emphasized); }

    public onButtonDown?: ButtonHandler;
    public onButtonUp?: ButtonHandler;

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
            if (event.phase === EventPhase.Began && typeof this.onButtonDown !== "undefined") {
                this.onButtonDown(this);
                return true;
            } else if (event.phase === EventPhase.Ended && typeof this.onButtonUp !== "undefined") {
                this.onButtonUp(this);
                return true;
            }
        }

        // Otherwise let the superclass handle it
        return super.interactionEvent(event);
    }
}
