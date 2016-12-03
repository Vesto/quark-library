import { View } from "./View";
import { Control } from "./Control";

export class Toggle extends View implements Control {
    public isEnabled: boolean;
    public isOn: boolean;
}