import { Color } from "../types/Color";
import { Font } from "../types/Font";
import { TextAlignmentMode } from "./properties/Text";

export class Appearance {
    public static emptyAppearance: Appearance = new Appearance();
    public static defaultAppearance: Appearance = Appearance.darkDefaultAppearance;

    public static get darkDefaultAppearance(): Appearance {
        let appearance = new Appearance();
        appearance.accentColor = Color.fromHex("00C3E7");
        appearance.primaryColor = Color.fromHex("FFFFFF");
        appearance.seconaryColor = Color.fromHex("4B4A5A");
        appearance.tertiaryColor = Color.fromHex("31313A");
        appearance.backgroundColor = Color.fromHex("383842");

        appearance.cornerRadius = 4;
        appearance.padding = 8;

        // TODO: other parameters
        return appearance;
    }

    // Colors
    public accentColor: Color;

    public primaryColor: Color; // Important or active elements
    public seconaryColor: Color; // Not as important active elements
    public tertiaryColor: Color; // Inactive elements

    public backgroundColor: Color;

    // Typography
    public titleFont: Font;
    public titleColor: Color;

    public subtitleFont: Font;
    public subtitleColor: Color;

    public textFont: Font;
    public textColor: Color;

    public subtextFont: Font;
    public subtextColor: Color;

    // Misc
    public cornerRadius: number;
    public padding: number;
    public languageTextAlignment: TextAlignmentMode; // For left or right-aligned languages
}
