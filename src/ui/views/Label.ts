///<reference path="../../types/Font.ts"/>
import { View, ViewBacking } from "./View";
import { Font } from "../../types/Font";
import { Color } from "../../types/Color";
import { LineBreakMode, TextAlignmentMode, TextVerticalAlignmentMode } from "../properties/Text";
import { Appearance } from "../Appearance";

export interface LabelBacking extends ViewBacking {
    qk_setText(text: string): void;
    qk_setFont(font: Font): void;
    qk_setTextColor(color: Color): void;
    qk_setLineCount(count: number): void;
    qk_setLineBreakMode(mode: LineBreakMode): void;
    qk_setAlignmentMode(mode: TextAlignmentMode): void;
    qk_setVerticalAlignmentMode(mode: TextVerticalAlignmentMode): void;
}

export enum LabelStyle {
    Title, Subtitle, Text, Subtext, None
}

export class Label extends View {
    public static createBacking: () => LabelBacking;
    public get labelBacking(): LabelBacking { return this.backing as LabelBacking; }

    private _text: string;
    public get text(): string { return this._text; }
    public set text(text: string) { this.labelBacking.qk_setText(text); }

    private _font: Font;
    public get font(): Font { return this._font; }
    public set font(font: Font) { this.proxyProperty("_font", font); }
    // noinspection TsLint
    private _fontUpdate() { this.labelBacking.qk_setFont(this._font); }

    private _textColor: Color;
    public get textColor(): Color { return this._textColor; }
    public set textColor(color: Color) { this.proxyProperty("_textColor", color); }
    // noinspection TsLint
    private _textColorUpdate() { this.labelBacking.qk_setTextColor(this._textColor); }

    private _lineCount: number;
    public get lineCount(): number { return this._lineCount; }
    public set lineCount(count: number) { this._lineCount = count; this.labelBacking.qk_setLineCount(count); }

    private _lineBreakMode: LineBreakMode;
    public get lineBreakMode(): LineBreakMode { return this._lineBreakMode; }
    public set lineBreakMode(mode: LineBreakMode) { this._lineBreakMode = mode; this.labelBacking.qk_setLineBreakMode(mode); }

    private _alignmentMode: TextAlignmentMode;
    public get alignmentMode(): TextAlignmentMode { return this._alignmentMode; }
    public set alignmentMode(mode: TextAlignmentMode) { this._alignmentMode = mode; this.labelBacking.qk_setAlignmentMode(mode); }

    private _verticalAlignmentMode: TextVerticalAlignmentMode;
    public get verticalAlignmentMode(): TextVerticalAlignmentMode { return this._verticalAlignmentMode; }
    public set verticalAlignmentMode(mode: TextVerticalAlignmentMode) { this._verticalAlignmentMode = mode; this.labelBacking.qk_setVerticalAlignmentMode(mode); }

    private _style: LabelStyle = LabelStyle.None;
    public get style(): LabelStyle { return this._style; }
    public set style(style: LabelStyle) { this._style = style; this.updateAppearance(); }

    public constructor(backing?: LabelBacking) {
        super(backing ? backing : Label.createBacking());

        // Set default values
        this.text = "";
        this.font = this.appearance.text.font;
        this.textColor = new Color(0, 0, 0, 1);
        this.lineCount = 0;
        this.lineBreakMode = LineBreakMode.WordWrap;
        this.alignmentMode = TextAlignmentMode.Left;
        this.verticalAlignmentMode = TextVerticalAlignmentMode.Center;

        // Override view defaults
        this.backgroundColor = new Color(0, 0, 0, 0);
    }

    public appearanceChanged(appearance: Appearance): void {
        super.appearanceChanged(appearance);

        // Update the appearance
        this.updateAppearance();
    }

    private updateAppearance() {
        // Style the view
        switch (this.style) {
            case LabelStyle.Title:
                this.appearance.title.styleView(this);
                break;
            case LabelStyle.Subtitle:
                this.appearance.subtitle.styleView(this);
                break;
            case LabelStyle.Text:
                this.appearance.text.styleView(this);
                break;
            case LabelStyle.Subtext:
                this.appearance.subtext.styleView(this);
                break;
            default:
                // Don't style .None
                return;
        }
    }
}
