import { Color } from "../../types/Color";
import { Rect } from "../../types/Rect";
import { Shadow } from "../../types/Shadow";

import { Logger } from "../../utils/Logger";

import { QKView } from "../../bridge/Views";

export class View {
    protected view: QKView;

    public constructor(view: QKView, save: boolean);
    public constructor();
    public constructor(view?: QKView, save: boolean = false) {
        // Assign the proper view or create it
        if (view) {
            this.view = view;
        } else {
            this.view = new QKView();
        }

        // Save the view if created new QKView or wants to be saved
        if (!view || save) {
            this.saveJSView();
        }
    }

    /// This saves this view to the QKView.jsView
    protected saveJSView() {
        this.view.jsView = this;
    }

    /* Positioning */
    public get rect(): Rect { return this.view.jsRect; }
    public set rect(rect: Rect) { this.view.jsRect = rect; }

    /* View hierarchy */
    public get superview(): View | undefined { return this.view.jsSuperview; }
    public get subviews(): View[] { return this.view.jsSubviews; }
    public addSubview(view: View) { this.view.jsAddSubview(view); }
    public removeFromSuperview() { this.view.jsRemoveFromSuperview(); }

    /* Events */

    /* Layout */
    /// Override point for subviews of a View.
    public layout() {
        Logger.print(`Layout ${this}`);
    }

    /* Visibility */
    public get hidden(): boolean { return this.view.jsHidden; }
    public set hidden(newValue: boolean) { this.view.jsHidden = newValue; }

    /* Style */
    public get backgroundColor(): Color { return this.view.jsBackgroundColor; }
    public set backgroundColor(newValue: Color) { this.view.jsBackgroundColor = newValue; }

    public get alpha(): number { return this.view.jsAlpha; }
    public set alpha(newValue: number) { this.view.jsAlpha = newValue; }

    public get shadow(): Shadow { return this.view.jsShadow; }
    public set shadow(newValue: Shadow) { this.view.jsShadow = newValue; }

    public get cornerRadius(): number { return this.view.jsCornerRadius; }
    public set cornerRadius(newValue: number) { this.view.jsCornerRadius = newValue; }
}
