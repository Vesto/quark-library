import { FocusEvent } from "../events/FocusEvent";
import { Control, ControlBacking } from "./Control";
import { Label, LabelBacking } from "./Label";

export interface TextFieldBacking extends LabelBacking, ControlBacking {
    qk_contentChangeCallback: (text: string) => void;
    qk_setIsSecure(secure: boolean): void;
}

export class TextField extends Label implements Control {
    public static createBacking: () => TextFieldBacking;
    public get textFieldBacking(): TextFieldBacking { return this.backing as TextFieldBacking; }

    private _isEnabled: boolean;
    public get isEnabled(): boolean { return this._isEnabled; }
    public set isEnabled(enabled: boolean) { this._isEnabled = enabled; this.textFieldBacking.qk_setIsEnabled(enabled); }

    private _isSecure: boolean; // If has those dot thingies
    public get isSecure(): boolean { return this._isSecure; }
    public set isSecure(secure: boolean) { this._isSecure = secure; this.textFieldBacking.qk_setIsSecure(secure); }

    public onChange?: (field: TextField, text: string) => void;

    public constructor(backing?: TextFieldBacking) {
        super(backing ? backing : TextField.createBacking());

        // Set the callback
        this.textFieldBacking.qk_contentChangeCallback = (text) => {
            // Save the text
            this._text = text;

            // Call the callback
            if (this.onChange) {
                this.onChange(this, text);
            }
        };

        // Set default values
        this.isEnabled = true;
        this.isSecure = false;
    }
}