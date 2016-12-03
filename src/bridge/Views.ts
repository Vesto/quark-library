import { Color } from "../types/Color";
import { Rect } from "../types/Rect";
import { Shadow } from "../types/Shadow";

import { View } from "../ui/views/View";

export declare class QKView {
    /* JavaScript Interop */
    public jsView?: View;

    /* Positioning */
    public jsRect: Rect;

    /* View hierarchy */
    public readonly jsSubviews: View[];
    public readonly jsSuperview?: View;
    public jsAddSubview(view: View): void;
    public jsRemoveFromSuperview(): void;

    /* Events */

    /* Layout */

    /* Visibility */
    public jsHidden: boolean;

    /* Style */
    public jsBackgroundColor: Color;
    public jsAlpha: number;
    public jsShadow: Shadow;
    public jsCornerRadius: number;

    /* Initiator */
    /// Creates a new view with a JSView.
    public constructor();
}

export declare class QKButton extends QKView {
    public jsTitle: string;
}
