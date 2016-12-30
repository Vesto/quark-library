import { Color } from "../types/Color";
import { Font } from "../types/Font";
import { TextAlignmentMode } from "./properties/Text";
import { Shadow } from "../types/Shadow";
import { View } from "./views/View";
import { Label } from "./views/Label";
import { Logger } from "../core/Logger";

export class AppearanceStyle {
    public constructor(
        public font: Font,
        public foregroundColor: Color,
        public backgroundColor: Color,
        public cornerRadius: number,
        public shadow: Shadow | undefined,
        public padding: number,
        public margin: number
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
}

export class Appearance {
    public static get emptyAppearance(): Appearance { return new Appearance(); }

    public static get defaultAppearance(): Appearance {
        let appearance = new Appearance();

        let font = new Font(17, { family: "Source Sans Pro", weight: 400 });
        if (!font) { throw new Error("Could not load font."); }
        let white = new Color(1, 1, 1, 1);
        let whiteTransparent = new Color(1, 1, 1, 0.5);
        // let black = new Color(0, 0, 0, 1);
        let clear = new Color(0, 0, 0, 0);
        let accentColor = Color.fromHex("00C3E7");
        let primaryColor = Color.fromHex("FFFFFF");
        let secondaryColor = Color.fromHex("4B4A5A");
        // let tertiaryColor = Color.fromHex("31313A");
        let backgroundColor = Color.fromHex("383842");
        let cornerRadius = 4;
        let shadow = undefined;
        let padding = 8;

        appearance.activeControl = new AppearanceStyle(font, accentColor, primaryColor, cornerRadius, shadow, padding, padding);
        appearance.normalControl = new AppearanceStyle(font, white, secondaryColor, cornerRadius, shadow, padding, padding);
        appearance.disabledControl = new AppearanceStyle(font, whiteTransparent, secondaryColor, cornerRadius, shadow, padding, padding);

        appearance.title = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.subtitle = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.text = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);
        appearance.subtext = new AppearanceStyle(font, white, clear, 0, undefined, padding, padding);

        appearance.backgroundColor = backgroundColor;
        appearance.languageTextAlignment = TextAlignmentMode.Left;

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

        this.title = emptyStyle;
        this.subtitle = emptyStyle;
        this.text = emptyStyle;
        this.subtext = emptyStyle;

        this.backgroundColor = new Color(0, 0, 0, 0);
        this.languageTextAlignment = TextAlignmentMode.Left;
    }

    // Controls
    public activeControl: AppearanceStyle;
    public normalControl: AppearanceStyle;
    public disabledControl: AppearanceStyle;

    // Text
    public title: AppearanceStyle;
    public subtitle: AppearanceStyle;
    public text: AppearanceStyle;
    public subtext: AppearanceStyle;

    // Misc
    public backgroundColor: Color;
    public languageTextAlignment: TextAlignmentMode; // For left or right-aligned languages
}
