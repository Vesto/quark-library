import { View } from "./View";
import { Control } from "./Control";

class Toggle extends View implements Control {
    public isEnabled: boolean;
    public isOn: boolean;
}