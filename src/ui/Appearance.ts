import { Cloneable } from "quark-core";
import { Color, Font, TextAlignmentMode, Shadow } from "quark-core";

export class Appearance implements Cloneable {
    public static get defaultAppearance(): Appearance {
        return Appearance.with(
            Color.fromHex("00C3E7"),
            Color.white,
            Color.fromHex("4B4A5A"),
            Color.fromHex("31313A"),
            Color.fromHex("383842"),

            new Font(17, { family: "Source Sans Pro", weight: 400 }),
            4,
            8,
            32,
            undefined
        );
    }

    public constructor() {
        // Set empty appearance styles
        let font = new Font(17, { family: "Source Sans Pro", weight: 400 });
        if (!font) { throw new Error("Could not load font."); }

        this.accentColor = Color.clear;
        this.primaryColor = Color.clear;
        this.secondaryColor = Color.clear;
        this.tertiaryColor = Color.clear;
        this.backgroundColor = Color.clear;

        this.titleFont = font;
        this.subtitleFont = font;
        this.textFont = font;
        this.subtextFont = font;

        this.cornerRadius = 0;
        this.spacing = 0;
        this.controlSize = 0;

        this.shadow = undefined;
        this.languageTextAlignment = TextAlignmentMode.Left;
    }

    public static with(
        accentColor: Color,
        primaryColor: Color,
        secondaryColor: Color,
        tertiaryColor: Color,
        backgroundColor: Color,

        font: Font,
        cornerRadius: number,
        spacing: number,
        controlSize: number,
        shadow?: Shadow
    ): Appearance {
        let appearance = new Appearance();

        appearance.accentColor = accentColor;
        appearance.primaryColor = primaryColor;
        appearance.secondaryColor = secondaryColor;
        appearance.tertiaryColor = tertiaryColor;
        appearance.backgroundColor = backgroundColor;

        appearance.titleFont = font;
        appearance.subtitleFont = font;
        appearance.textFont = font;
        appearance.subtextFont = font;

        appearance.cornerRadius = cornerRadius;
        appearance.spacing = spacing;
        appearance.controlSize = controlSize;

        appearance.shadow = shadow;
        appearance.languageTextAlignment = TextAlignmentMode.Left;

        return appearance;
    }

    // Colors
    public accentColor: Color;
    public primaryColor: Color;
    public secondaryColor: Color;
    public tertiaryColor: Color;
    public backgroundColor: Color;

    // Text
    public titleFont: Font;
    public subtitleFont: Font;
    public textFont: Font;
    public subtextFont: Font;

    // Layout
    public cornerRadius: number;
    public spacing: number;
    public controlSize: number;

    // Misc
    public shadow: Shadow | undefined;
    public languageTextAlignment: TextAlignmentMode; // For left or right-aligned languages

    public clone(): Appearance {
        let appearance = new Appearance();

        appearance.accentColor = this.accentColor.clone();
        appearance.primaryColor = this.primaryColor.clone();
        appearance.secondaryColor = this.secondaryColor.clone();
        appearance.tertiaryColor = this.tertiaryColor.clone();

        appearance.titleFont = this.titleFont;
        appearance.subtitleFont = this.subtitleFont;
        appearance.textFont = this.textFont;
        appearance.subtextFont = this.subtextFont;

        appearance.cornerRadius = this.cornerRadius;
        appearance.spacing = this.spacing;
        appearance.controlSize = this.controlSize;

        appearance.shadow = this.shadow;
        appearance.languageTextAlignment = this.languageTextAlignment;

        return appearance;
    }
}
