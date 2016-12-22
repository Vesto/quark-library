///<reference path="../../types/Font.ts"/>
import { View, ViewBacking } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";
import { LineBreakMode, TextAlignmentMode } from "../properties/Text";

export interface LabelBacking extends ViewBacking {
    qk_text: string;
    qk_font: Font;
    qk_color: Color;
    qk_lineCount: number;
    qk_lineBreakMode: LineBreakMode;
    qk_alignmentMode: TextAlignmentMode;
}

export class Label extends View {
    get labelBacking(): LabelBacking { return this.backing as LabelBacking; }

    public get text(): string { return this.labelBacking.qk_text; } // TODO: Add back
    public set text(newValue: string) { this.labelBacking.qk_text = newValue; }

    public get font(): Font { return this.labelBacking.qk_font; }
    public set font(newValue: Font) { this.labelBacking.qk_font = newValue; }

    public get color(): Color { return this.labelBacking.qk_color; }
    public set color(newValue: Color) { this.labelBacking.qk_color = newValue; }

    public get lineCount(): number { return this.labelBacking.qk_lineCount; }
    public set lineCount(newValue: number) { this.labelBacking.qk_lineCount = newValue; }

    public get lineBreakMode(): LineBreakMode { return this.labelBacking.qk_lineBreakMode; }
    public set lineBreakMode(newValue: LineBreakMode) { this.labelBacking.qk_lineBreakMode = newValue; }

    public get alignmentMode(): TextAlignmentMode { return this.labelBacking.qk_alignmentMode; }
    public set alignmentMode(newValue: TextAlignmentMode) { this.labelBacking.qk_alignmentMode = newValue; }

    public constructor() {
        super();
    }
}
