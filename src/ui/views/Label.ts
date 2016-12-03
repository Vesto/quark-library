import { View } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";

export class Label extends View {
    public text: string; // Markdown styled text
    public textColor: Color;
    public font: Font;
}