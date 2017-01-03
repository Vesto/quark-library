import { Color } from "../types/Color";
import { Font } from "../types/Font";
import { TextAlignmentMode } from "./properties/Text";
import { Shadow } from "../types/Shadow";
import { View } from "./views/View";
import { Label } from "./views/Label";
import { Cloneable } from "../utils/Cloneable";

export class AppearanceStyle implements Cloneable {
    public constructor(
        public readonly font: Font,
        public readonly foregroundColor: Color,
        public readonly backgroundColor: Color,
        public readonly cornerRadius: number,
        public readonly shadow: Shadow | undefined,
        public readonly padding: number,
        public readonly margin: number
    ) {

    }

    public styleView(view: View, foreground: View | undefined = undefined) {
        // View
        if (view instanceof Label) {
            view.font = this.font;
            view.textColor = this.foregroundColor;
        }
        view.backgroundColor = this.backgroundColor;
        view.cornerRadius = this.cornerRadius;
        view.shadow = this.shadow;

        // Foreground
        if (foreground instanceof Label) {
            foreground.font = this.font;
            foreground.textColor = this.foregroundColor;
        } else if (foreground) {
            foreground.backgroundColor = this.foregroundColor;
        }
    }

    public clone(): AppearanceStyle {
        return new AppearanceStyle(
            this.font,
            this.foregroundColor.clone(),
            this.backgroundColor.clone(),
            this.cornerRadius,
            this.shadow ? this.shadow.clone() : undefined,
            this.padding,
            this.margin
        );
    }
}

export class Appearance implements Cloneable {
    public static get emptyAppearance(): Appearance { return new Appearance(); }

    public static get defaultAppearance(): Appearance {
        let appearance = new Appearance();

        let font = new Font(17, { family: "Source Sans Pro", weight: 400 });
        if (!font) { throw new Error("Could not load font."); }
        let black = new Color(0, 0, 0, 1);
        let white = new Color(1, 1, 1, 1);
        let whiteTransparent = new Color(1, 1, 1, 0.5);
        // let black = new Color(0, 0, 0, 1);
        let clear = new Color(0, 0, 0, 0);
        let accentColor = Color.fromHex("00C3E7");
        let primaryColor = Color.fromHex("FFFFFF");
        let secondaryColor = Color.fromHex("4B4A5A");
        let tertiaryColor = Color.fromHex("31313A");
        let backgroundColor = Color.fromHex("383842");
        let cornerRadius = 4;
        let shadow = undefined;
        let padding = 8;

        appearance.activeControl = new AppearanceStyle(font, accentColor, primaryColor, cornerRadius, shadow, padding, padding);
        appearance.normalControl = new AppearanceStyle(font, white, secondaryColor, cornerRadius, shadow, padding, padding);
        appearance.disabledControl = new AppearanceStyle(font, whiteTransparent, secondaryColor, cornerRadius, shadow, padding, padding);

        appearance.alternateActiveControl = new AppearanceStyle(font, black, primaryColor, cornerRadius, shadow, padding, padding);
        appearance.alternateNormalControl = new AppearanceStyle(font, white, tertiaryColor, cornerRadius, shadow, padding, padding);
        appearance.alternateDisabledControl = new AppearanceStyle(font, whiteTransparent, tertiaryColor, cornerRadius, shadow, padding, padding);

        appearance.title = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.subtitle = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.text = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.subtext = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);

        appearance.backgroundColor = backgroundColor;
        appearance.languageTextAlignment = TextAlignmentMode.Left;

        appearance.spacing = padding;
        appearance.controlSize = 44;

        return appearance;
    }

    public constructor() {
        // Set empty appearance styles
        let font = new Font(17, { family: "Source Sans Pro", weight: 400 });
        if (!font) { throw new Error("Could not load font."); }
        let emptyStyle = new AppearanceStyle(font, new Color(0, 0, 0, 0), new Color(0, 0, 0, 0), 0, undefined, 0, 0);

        this.activeControl = emptyStyle;
        this.normalControl = emptyStyle;
        this.disabledControl = emptyStyle;

        this.alternateActiveControl = emptyStyle;
        this.alternateNormalControl = emptyStyle;
        this.alternateDisabledControl = emptyStyle;

        this.title = emptyStyle;
        this.subtitle = emptyStyle;
        this.text = emptyStyle;
        this.subtext = emptyStyle;

        this.spacing = 8;
        this.controlSize = 0;

        this.backgroundColor = new Color(0, 0, 0, 0);
        this.languageTextAlignment = TextAlignmentMode.Left;
    }

    // Controls
    public activeControl: AppearanceStyle;
    public normalControl: AppearanceStyle;
    public disabledControl: AppearanceStyle;

    public alternateActiveControl: AppearanceStyle;
    public alternateNormalControl: AppearanceStyle;
    public alternateDisabledControl: AppearanceStyle;

    // Text
    public title: AppearanceStyle;
    public subtitle: AppearanceStyle;
    public text: AppearanceStyle;
    public subtext: AppearanceStyle;

    // Layout
    public spacing: number;
    public controlSize: number;

    // Misc
    public backgroundColor: Color;
    public languageTextAlignment: TextAlignmentMode; // For left or right-aligned languages

    public clone(): Appearance {
        let appearance = new Appearance();

        appearance.activeControl = this.activeControl.clone();
        appearance.normalControl = this.normalControl.clone();
        appearance.disabledControl = this.disabledControl.clone();

        appearance.title = this.title.clone();
        appearance.subtitle = this.subtitle.clone();
        appearance.text = this.text.clone();
        appearance.subtext = this.subtext.clone();

        appearance.spacing = this.spacing;
        appearance.controlSize = this.controlSize;

        appearance.backgroundColor = this.backgroundColor.clone();
        appearance.languageTextAlignment = this.languageTextAlignment;

        return appearance;
    }
}
