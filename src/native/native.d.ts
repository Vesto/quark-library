
declare module "quark-native" {
    export class QKWindow {
        public jsRootView: any;
    }

    export class QKLogger {
        public static output(test: string): void;
    }

    export class QKView {
        /* JavaScript Interop */
        public jsView?: any;

        /* Positioning */
        public jsRect: any;

        /* View hierarchy */
        public readonly jsSubviews: any[];
        public readonly jsSuperview?: any;
        public jsAddSubview(view: any): void;
        public jsRemoveFromSuperview(): void;

        /* Events */

        /* Layout */

        /* Visibility */
        public jsHidden: boolean;

        /* Style */
        public jsBackgroundColor: any;
        public jsAlpha: number;
        public jsShadow: any;
        public jsCornerRadius: number;

        /* Initiator */
        /// Creates a new view with a JSView.
        public constructor();
    }

    export class QKButton extends QKView {
        public jsTitle: string;
    }
}
