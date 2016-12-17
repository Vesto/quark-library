import { InteractionEvent } from "../events/InteractionEvent";
import { KeyEvent } from "../events/KeyEvent";
import { ScrollEvent } from "../events/ScrollEvent";
import { EventResponder } from "../events/EventResponder";
import { Rect } from "../../types/Rect";
import { Point } from "../../types/Point";
import { Color } from "../../types/Color";
import { Shadow } from "../../types/Shadow";

// Interface for what `quark-native` needs to implement with prototypes
export interface View {
    qk_init(createView: boolean): void;

    qk_rect(): Rect;
    qk_setRect(rect: Rect): void;

    qk_subviews(): View[];
    qk_superview(): View | undefined;
    qk_addSubview(view: View, index: number): void;
    qk_removeFromSuperview(): void;

    qk_isHidden(): boolean;
    qk_setHidden(hidden: boolean): void;

    qk_backgroundColor(): Color;
    qk_setBackgroundColor(color: Color): void;
    qk_alpha(): number;
    qk_setAlpha(alpha: number): void;
    qk_shadow(): Shadow | undefined;
    qk_setShadow(shadow: Shadow | undefined): void;
    qk_cornerRadius(): number;
    qk_setCornerRadius(radius: number): void;

}

export class View implements EventResponder {
    public name: string = "";

    public constructor(createView: boolean = false) {
        // Initialize
        this.qk_init(createView);
    }

    /* Positioning */
    public get rect(): Rect { return this.qk_rect(); }
    public set rect(rect: Rect) { this.qk_setRect(rect); }

    public get center(): Point { return this.rect.center; }
    public set center(value: Point) {
        this.rect = new Rect(
            new Point(value.x - this.rect.width / 2, value.y - this.rect.height / 2),
            this.rect.size
        );
    }

    public get absolutePoint(): Point {
        // Add transforms until it's at the topmost superview
        let origin = new Point(0, 0);
        let s: View | undefined = this;
        while (s && s.superview) {
            origin = origin.add(s.rect.point);
            s = s.superview;
        }

        // Return it
        return origin;
    }

    public convertPointFrom(view: View, point: Point): Point {
        return point.subtract(this.absolutePoint).add(view.absolutePoint);
    }

    public convertPointTo(view: View, point: Point): Point {
        return view.convertPointFrom(this, point);
    }

    /* View hierarchy */
    public get superview(): View | undefined {
        return this.qk_superview();
    }
    public get subviews(): View[] {
        return this.qk_subviews();
    }
    public addSubviewAt(view: View, index: number) {
        let newIndex = Math.min(Math.max(Math.floor(index), 0), this.subviews.length);
        this.qk_addSubview(view, newIndex);
    }
    public addSubview(view: View) { this.addSubviewAt(view, this.subviews.length); }
    public removeFromSuperview() { this.qk_removeFromSuperview(); }

    /* Events */
    public interactionEvent(event: InteractionEvent): boolean {
        // Override point
        return false;
    }

    public keyEvent(event: KeyEvent): boolean {
        // Override point
        return false;
    }

    public scrollEvent(event: ScrollEvent): boolean {
        // Override point
        return false;
    }

    /* Layout */
    /// Override point for subviews of a View.
    public layout() {
        // Override point
    }

    /* Visibility */
    public get isHidden(): boolean { return this.qk_isHidden(); }
    public set isHidden(value: boolean) { this.qk_setHidden(value); }

    /* Style */
    public get backgroundColor(): Color { return this.qk_backgroundColor(); }
    public set backgroundColor(color: Color) { this.qk_setBackgroundColor(color); }

    public get opacity(): number { return this.qk_alpha(); }
    public set alpha(value: number) { this.qk_setAlpha(value); }

    public get shadow(): Shadow | undefined { return this.qk_shadow(); }
    public set shadow(shadow: Shadow | undefined) { this.qk_setShadow(shadow); }

    public get cornerRadius(): number { return this.qk_cornerRadius(); }
    public set cornerRadius(value: number) { this.qk_setCornerRadius(value); }

    /* Quark implementation methods */
    // public qk_init: (createView: boolean) => void;
    //
    // public qk_rect: () => Rect;
    // public qk_setRect: (rect: Rect) => void;
    //
    // public qk_subviews: () => View[];
    // public qk_superview: () => View | undefined;
    // public qk_addSubview: (view: View, index: number) => void;
    // public qk_removeFromSuperview: () => void;
    //
    // public qk_isHidden: () => boolean;
    // public qk_setHidden: (hidden: boolean) => void;
    //
    // public qk_backgroundColor: () => Color;
    // public qk_setBackgroundColor: (color: Color) => void;
    // public qk_alpha: () => number;
    // public qk_setAlpha: (opacity: number) => void;
    // public qk_shadow: () => Shadow | undefined;
    // public qk_setShadow: (shadow: Shadow | undefined) => void;
    // public qk_cornerRadius: () => number;
    // public qk_setCornerRadius: (radius: number) => void;
}
