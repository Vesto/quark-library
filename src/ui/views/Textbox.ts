import { Control } from "./Control";
import { View } from "./View";

export class Textbox extends View implements Control {
    public text: string; // TODO: Implement
    public maxLines: number | undefined; // undefined for unlimited, 0 for horizontally scrolling // TODO: Implement
    public resizeToFit: boolean; // If the textbox resizes to fit the contents // TODO: Implement
    public isSecure: boolean; // If has those dot thingies // TODO: Implement

    public isEnabled: boolean; // TODO: Implement

}