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

    protected _text: string;
    public get text(): string { return this._text; }
    public set text(text: string) { this._text = text; this.labelBacking.qk_setText(text); }

    protected _font: Font;
    public get font(): Font { return this._font; }
    public set font(font: Font) { this.proxyProperty("_font", font); }
    private _fontUpdate() { this.labelBacking.qk_setFont(this._font); }

    protected _textColor: Color;
    public get textColor(): Color { return this._textColor; }
    public set textColor(color: Color) { this.proxyProperty("_textColor", color); }
    private _textColorUpdate() { this.labelBacking.qk_setTextColor(this._textColor); }

    protected _lineCount: number;
    public get lineCount(): number { return this._lineCount; }
    public set lineCount(count: number) { this._lineCount = count; this.labelBacking.qk_setLineCount(count); }

    protected _lineBreakMode: LineBreakMode;
    public get lineBreakMode(): LineBreakMode { return this._lineBreakMode; }
    public set lineBreakMode(mode: LineBreakMode) { this._lineBreakMode = mode; this.labelBacking.qk_setLineBreakMode(mode); }

    protected _alignmentMode: TextAlignmentMode;
    public get alignmentMode(): TextAlignmentMode { return this._alignmentMode; }
    public set alignmentMode(mode: TextAlignmentMode) { this._alignmentMode = mode; this.labelBacking.qk_setAlignmentMode(mode); }

    protected _verticalAlignmentMode: TextVerticalAlignmentMode;
    public get verticalAlignmentMode(): TextVerticalAlignmentMode { return this._verticalAlignmentMode; }
    public set verticalAlignmentMode(mode: TextVerticalAlignmentMode) { this._verticalAlignmentMode = mode; this.labelBacking.qk_setVerticalAlignmentMode(mode); }

    protected _style: LabelStyle = LabelStyle.None;
    public get style(): LabelStyle { return this._style; }
    public set style(style: LabelStyle) { this._style = style; this.updateAppearance(); }

    public constructor(backing?: LabelBacking) {
        super(backing ? backing : Label.createBacking());

        // Set default values
        this.text = "";
        this.font = this.appearance.textFont;
        this.textColor = new Color(0, 0, 0, 1);
        this.lineCount = 0;
        this.lineBreakMode = LineBreakMode.WordWrap;
        this.alignmentMode = TextAlignmentMode.Left;
        this.verticalAlignmentMode = TextVerticalAlignmentMode.Center;
        this.style = LabelStyle.None;

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
                this.font = this.appearance.titleFont;
                break;
            case LabelStyle.Subtitle:
                this.font = this.appearance.subtitleFont;
                break;
            case LabelStyle.Text:
                this.font = this.appearance.textFont;
                break;
            case LabelStyle.Subtext:
                this.font = this.appearance.subtextFont;
                break;
            default:
                // Don't style .None
                return;
        }
    }
}
