import { Control } from "./Control";
import { View } from "./View";

export class Textbox extends View implements Control {
    public text: string;
    public maxLines: number | undefined; // undefined for unlimited, 0 for horizontally scrolling
    public resizeToFit: boolean; // If the textbox resizes to fit the contents
    public isSecure: boolean; // If has those dot thingies

    public isEnabled: boolean;

}