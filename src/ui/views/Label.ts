import { View } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";

export class Label extends View {
    public text: string; // Markdown styled text // TODO: Implement
    public textColor: Color; // TODO: Implement
    public font: Font; // TODO: Implement
}