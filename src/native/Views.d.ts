import { View } from "../ui/views/View";
import { Rect } from "../types/Rect";
import { Color } from "../types/Color";
import { Shadow } from "../types/Shadow";

declare module "quark-native" {
    export class QKView {
        /* JavaScript Interop */
        public jsView?: View;

        /* Positioning */
        public jsRect: Rect;

        /* View hierarchy */
        public readonly jsSubviews: View[];
        public readonly jsSuperview?: View;
        public jsAddSubview(view: any): void;
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

    export class QKButton extends QKView {
        public jsTitle: string;
    }
}
