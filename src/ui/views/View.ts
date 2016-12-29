import { InteractionEvent } from "../events/InteractionEvent";
import { KeyEvent } from "../events/KeyEvent";
import { ScrollEvent } from "../events/ScrollEvent";
import { EventResponder } from "../events/EventResponder";
import { Rect } from "../../types/Rect";
import { Point } from "../../types/Point";
import { Color } from "../../types/Color";
import { Shadow } from "../../types/Shadow";
import { Module } from "../../core/Module";
import { Appearance } from "../Appearance";
import { Logger } from "../../core/Logger";

// Interface for what `quark-native` needs to implement with prototypes
export interface ViewBacking {
    qk_view?: View;

    qk_init(): void;

    qk_rect: Rect;

    qk_subviews: View[];
    qk_superview: View | undefined;
    qk_addSubview(view: View, index: number): void;
    qk_removeFromSuperview(): void;

    qk_isHidden: boolean;
    qk_clipSubviews: boolean;

    qk_backgroundColor: Color;
    qk_alpha: number;
    qk_shadow: Shadow | undefined;
    qk_cornerRadius: number;
}

export class View implements EventResponder {
    public static createBacking: () => ViewBacking;
    public readonly backing: ViewBacking;

    // A reference to the module this view is in
    public readonly module: Module;

    public name: string = "";

    public constructor(backing?: ViewBacking) {
        // Check inside VM, save instance of module backing
        this.module = Module.shared;

        // Initialize and save the backing
        this.backing = backing ? backing : View.createBacking();
        this.backing.qk_view = this;
        this.backing.qk_init();

        // Set the default values on the view if it's new; it is assumed that all views that are used by Quark have
        // to be initialized by Quark.
        this.rect = Rect.zero;
        this.isHidden = false;
        this.clipSubviews = true;
        this.backgroundColor = new Color(1, 1, 1, 1);
        this.alpha = 1.0;
        this.shadow = undefined;
        this.cornerRadius = 0;

        // Set the initial appearance.
        this._appearance = Appearance.emptyAppearance;
    }

    /* Appearance */
    private _appearance: Appearance;
    public get appearance(): Appearance { return this._appearance; }
    public set appearance(appearance: Appearance) {
        Logger.print("Set appearance", this);
        // Make sure the appearance has actually changed
        if (this._appearance === appearance) { return; }

        // Set the appearance
        this._appearance = appearance;

        // Notify appearance change
        this.appearanceChanged(appearance);

        // Set on the subviews
        for (let subview of this.subviews) {
            subview.appearance = appearance;
        }
    }

    public appearanceChanged(appearance: Appearance) {
        Logger.print("Appearance changed");
        // Override point for subviews
    }

    /* Positioning */
    public get rect(): Rect { return this.backing.qk_rect; }
    public set rect(rect: Rect) { this.backing.qk_rect = rect; }

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
        return this.backing.qk_superview;
    }

    public get subviews(): View[] {
        return this.backing.qk_subviews;
    }

    public addSubviewAt(view: View, index: number) {
        let newIndex = Math.min(Math.max(Math.floor(index), 0), this.subviews.length);
        this.backing.qk_addSubview(view, newIndex);
    }

    public addSubview(view: View) { this.addSubviewAt(view, this.subviews.length); }

    public removeFromSuperview() { this.backing.qk_removeFromSuperview(); }

    public movedToSuperview(superview: View | undefined) {
        // Set the appearance to the parent's appearance
        if (superview) {
            this.appearance = superview.appearance;
        }
    }

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
    public get isHidden(): boolean { return this.backing.qk_isHidden; }
    public set isHidden(value: boolean) { this.backing.qk_isHidden = value; }

    public get clipSubviews(): boolean { return this.backing.qk_clipSubviews; }
    public set clipSubviews(value: boolean) { this.backing.qk_clipSubviews = value; }

    /* Style */
    public get backgroundColor(): Color { return this.backing.qk_backgroundColor; }
    public set backgroundColor(color: Color) { this.backing.qk_backgroundColor = color; }

    public get alpha(): number { return this.backing.qk_alpha; }
    public set alpha(value: number) { this.backing.qk_alpha = value; }

    public get shadow(): Shadow | undefined { return this.backing.qk_shadow; }
    public set shadow(shadow: Shadow | undefined) { this.backing.qk_shadow = shadow; }

    public get cornerRadius(): number { return this.backing.qk_cornerRadius; }
    public set cornerRadius(value: number) { this.backing.qk_cornerRadius = value; }
}
