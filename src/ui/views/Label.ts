import { View } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";
import { LineBreakMode, TextAlignmentMode } from "../properties/Text";
import { QKLabel } from "quark-native";

export class Label extends View {
    protected get label(): QKLabel { return this.view as QKLabel; }

    public get text(): string { return this.label.jsText; }
    public set text(newValue: string) { this.label.jsText = newValue; }

    public get font(): Font { return this.label.jsFont; }
    public set font(newValue: Font) { this.label.jsFont = newValue; }

    public get color(): Color { return this.label.jsColor; }
    public set color(newValue: Color) { this.label.jsColor = newValue; }

    public get lineCount(): number { return this.label.jsLineCount; }
    public set lineCount(newValue: number) { this.label.jsLineCount = newValue; }

    public get lineBreakMode(): LineBreakMode { return this.label.jsLineBreakMode; }
    public set lineBreakMode(newValue: LineBreakMode) { this.label.jsLineBreakMode = newValue; }

    public get alignmentMode(): TextAlignmentMode { return this.label.jsAlignmentMode; }
    public set alignmentMode(newValue: TextAlignmentMode) { this.label.jsAlignmentMode = newValue; }

    public constructor() {
        super(new QKLabel());
    }
}
