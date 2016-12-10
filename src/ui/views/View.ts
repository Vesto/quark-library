import { Color } from "../../types/Color";
import { Rect } from "../../types/Rect";
import { Shadow } from "../../types/Shadow";

import { QKView } from "quark-native";
import { Point } from "../../types/Point";
import { InteractionEvent } from "../events/InteractionEvent";
import { KeyEvent } from "../events/KeyEvent";
import { ScrollEvent } from "../events/ScrollEvent";
import { Logger } from "../../utils/Logger";

export class View {
    /// The QKView backing this view object.
    public view: QKView;

    public name: string = "";

    public constructor();
    public constructor(view: QKView);
    public constructor(view?: QKView) {
        // Assign the proper view or create it
        if (view) {
            this.view = view;
        } else {
            this.view = new QKView();
        }

        // Save the JSView
        this.saveJSView();
    }

    /// This saves this view to the QKView.jsView
    protected saveJSView() {
        this.view.jsView = this;
    }

    /* Positioning */
    public get rect(): Rect { return this.view.jsRect; }
    public set rect(rect: Rect) { this.view.jsRect = rect; }

    public get center(): Point { return this.rect.center; }
    public set center(newValue: Point) {
        this.rect = new Rect(
            new Point(newValue.x - this.rect.width / 2, newValue.y - this.rect.height / 2),
            this.rect.size
        );
    }

    /* View hierarchy */
    public get superview(): View | undefined {
        if (this.view.jsSuperview) {
            return this.view.jsSuperview.jsView;
        }
        return undefined;
    }
    public get subviews(): View[] {
        return this.view.jsSubviews.map(x => x.jsView);
    }
    public addSubview(view: View) { this.view.jsAddSubview(view.view); }
    public removeFromSuperview() { this.view.jsRemoveFromSuperview(); }

    /* Events */
    public interactionEvent(event: InteractionEvent) {
        Logger.print(`Interaction ${event}`);
    }

    public keyEvent(event: KeyEvent) {
        Logger.print(`Key ${event}`);
    }

    public scrollEvent(event: ScrollEvent) {
        Logger.print(`Scroll ${event}`);
    }

    /* Layout */
    /// Override point for subviews of a View.
    public layout() {
        // Override point
    }

    /* Visibility */
    public get hidden(): boolean { return this.view.jsHidden; }
    public set hidden(newValue: boolean) { this.view.jsHidden = newValue; }

    /* Style */
    public get backgroundColor(): Color { return this.view.jsBackgroundColor; }
    public set backgroundColor(newValue: Color) { this.view.jsBackgroundColor = newValue; }

    public get alpha(): number { return this.view.jsAlpha; }
    public set alpha(newValue: number) { this.view.jsAlpha = newValue; }

    public get shadow(): Shadow | undefined { return this.view.jsShadow; }
    public set shadow(newValue: Shadow | undefined) { this.view.jsShadow = newValue; }

    public get cornerRadius(): number { return this.view.jsCornerRadius; }
    public set cornerRadius(newValue: number) { this.view.jsCornerRadius = newValue; }
}
