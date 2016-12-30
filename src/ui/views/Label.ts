///<reference path="../../types/Font.ts"/>
import { View, ViewBacking } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";
import { LineBreakMode, TextAlignmentMode, TextVerticalAlignmentMode } from "../properties/Text";
import { Appearance } from "../Appearance";

export interface LabelBacking extends ViewBacking {
    qk_text: string;
    qk_font: Font;
    qk_textColor: Color;
    qk_lineCount: number;
    qk_lineBreakMode: LineBreakMode;
    qk_alignmentMode: TextAlignmentMode;
    qk_verticalAlignmentMode: TextVerticalAlignmentMode;
}

export enum LabelStyle {
    Title, Subtitle, Text, Subtext, None
}

export class Label extends View {
    public static createBacking: () => LabelBacking;
    public get labelBacking(): LabelBacking { return this.backing as LabelBacking; }

    public get text(): string { return this.labelBacking.qk_text; } // TODO: Add back
    public set text(newValue: string) { this.labelBacking.qk_text = newValue; }

    public get font(): Font { return this.labelBacking.qk_font; }
    public set font(newValue: Font) { this.labelBacking.qk_font = newValue; }

    public get textColor(): Color { return this.labelBacking.qk_textColor; }
    public set textColor(newValue: Color) { this.labelBacking.qk_textColor = newValue; }

    public get lineCount(): number { return this.labelBacking.qk_lineCount; }
    public set lineCount(newValue: number) { this.labelBacking.qk_lineCount = newValue; }

    public get lineBreakMode(): LineBreakMode { return this.labelBacking.qk_lineBreakMode; }
    public set lineBreakMode(newValue: LineBreakMode) { this.labelBacking.qk_lineBreakMode = newValue; }

    public get alignmentMode(): TextAlignmentMode { return this.labelBacking.qk_alignmentMode; }
    public set alignmentMode(newValue: TextAlignmentMode) { this.labelBacking.qk_alignmentMode = newValue; }

    public get verticalAlignmentMode(): TextVerticalAlignmentMode { return this.labelBacking.qk_verticalAlignmentMode; }
    public set verticalAlignmentMode(newValue: TextVerticalAlignmentMode) { this.labelBacking.qk_verticalAlignmentMode = newValue; }

    public style: LabelStyle = LabelStyle.None;

    public constructor(backing?: LabelBacking) {
        super(backing ? backing : Label.createBacking());

        // Set default values
        this.text = "";
        this.font = this.appearance.text.font;
        this.textColor = new Color(0, 0, 0, 1);
        this.lineCount = 0;
        this.lineBreakMode = LineBreakMode.WordWrap;
        this.alignmentMode = TextAlignmentMode.Left;
        this.verticalAlignmentMode = TextVerticalAlignmentMode.Middle;

        // Override view defaults
        this.backgroundColor = new Color(0, 0, 0, 0);
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Get the style
        switch (this.style) {
            case LabelStyle.Title:
                appearance.title.styleView(this);
                break;
            case LabelStyle.Subtitle:
                appearance.subtitle.styleView(this);
                break;
            case LabelStyle.Text:
                appearance.text.styleView(this);
                break;
            case LabelStyle.Subtext:
                appearance.subtext.styleView(this);
                break;
            default:
                // Don't style .None
                return;
        }
    }
}
