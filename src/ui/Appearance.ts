import { Color } from "../types/Color";
import { Font } from "../types/Font";
import { TextAlignmentMode } from "./properties/Text";
import { Shadow } from "../types/Shadow";
import { View } from "./views/View";
import { Label } from "./views/Label";

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
    public static emptyAppearance: Appearance = new Appearance();
    public static defaultAppearance: Appearance = Appearance.darkDefaultAppearance;

    public static get darkDefaultAppearance(): Appearance {
        let appearance = new Appearance();

        let font = new Font();
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
