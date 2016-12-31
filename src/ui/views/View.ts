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

// Interface for what `quark-native` needs to implement with prototypes
export interface ViewBacking {
    qk_view?: View;

    qk_init(): void;
    qk_appearanceChanged(appearance: Appearance): void;

    qk_setRect(rect: Rect): void;

    readonly qk_subviews: View[];
    readonly qk_superview: View | undefined;
    qk_addSubview(view: View, index: number): void;
    qk_removeFromSuperview(): void;

    qk_setIsHidden(hidden: boolean): void;
    qk_setClipSubviews(clip: boolean): void;

    qk_setBackgroundColor(color: Color): void;
    qk_setAlpha(alpha: number): void;
    qk_setShadow(shadow: Shadow | undefined): void;
    qk_setCornerRadius(radius: number): void;
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

        // Set the initial appearance.
        this._appearance = Appearance.emptyAppearance;

        // Set the default values on the view if it's new; it is assumed that all views that are used by Quark have
        // to be initialized by Quark.
        this.rect = Rect.zero;
        this.isHidden = false;
        this.clipSubviews = true;
        this.backgroundColor = new Color(1, 1, 1, 1);
        this.alpha = 1.0;
        this.shadow = undefined;
        this.cornerRadius = 0;
    }

    /* Appearance */
    protected _appearance: Appearance;
    public get appearance(): Appearance { return this._appearance; }
    public set appearance(appearance: Appearance) {
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
        // Notify the backing
        this.backing.qk_appearanceChanged(appearance);
    }

    /* Positioning */
    protected _rect: Rect = Rect.zero;
    public get rect(): Rect { return this._rect; }
    public set rect(rect: Rect) { this._rect = rect; this.backing.qk_setRect(rect); }

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
    public get subviews(): View[] {
        return this.backing.qk_subviews;
    }

    public get superview(): View | undefined {
        return this.backing.qk_superview;
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
    protected _isHidden: boolean;
    public get isHidden(): boolean { return this.isHidden; }
    public set isHidden(hidden: boolean) { this._isHidden = hidden; this.backing.qk_setIsHidden(hidden); }

    protected _clipSubviews: boolean;
    public get clipSubviews(): boolean { return this._clipSubviews; }
    public set clipSubviews(clip: boolean) { this._clipSubviews = clip; this.backing.qk_setClipSubviews(clip); }

    /* Style */
    protected _backgroundColor: Color;
    public get backgroundColor(): Color { return this._backgroundColor; }
    public set backgroundColor(color: Color) { this.proxyProperty("_backgroundColor", color); }
    private _backgroundColorUpdate() { this.backing.qk_setBackgroundColor(this._backgroundColor); }

    protected _alpha: number;
    public get alpha(): number { return this._alpha; }
    public set alpha(value: number) { this._alpha = value; this.backing.qk_setAlpha(value); }

    protected _shadow?: Shadow;
    public get shadow(): Shadow | undefined { return this._shadow; }
    public set shadow(shadow: Shadow | undefined) { this.proxyProperty("_shadow", shadow); }
    private _shadowUpdate() { this.backing.qk_setShadow(this._shadow);  }

    protected _cornerRadius: number;
    public get cornerRadius(): number { return this._cornerRadius; }
    public set cornerRadius(radius: number) { this._cornerRadius = radius; this.backing.qk_setCornerRadius(radius); }

    /* Proxy Utils */
    // List of revoke function for the properties
    protected propertyRevocables: { [property: string]: () => void } = { };

    // This creates a revocable proxy from a value and calls a callback when a property changes.
    private createProxy<T>(newValue: T, callback: () => void): { proxy: T; revoke: () => void; } {
        return Proxy.revocable(
            newValue,
            {
                set: (target, property, value) => {
                    (target as any)[property] = value;
                    callback();
                    return true;
                },
            }
        );
    }

    // TODO: Mark custom properties on the object that need to be proxied too, e.g. Rect and Shadow

    // Proxy a property. To use, this, have a property called "<property-name>" then have another function called
    // "<property-name>Update". The update function will automatically be caleld when the property changes and when
    // this method is called if `autoCall` is true. This is only for use with objects – not primitives – because it
    // notifies when each property is modified.
    protected proxyProperty<T>(property: string, newValue: T, autoCall: boolean = true) {
        // Revoke the property if it exists already
        if (this.propertyRevocables[property]) { this.propertyRevocables[property](); }

        // Check if new value is undefined
        if (typeof newValue === "undefined") {
            // Remove the proxy
            delete this.propertyRevocables[property];

            // Set the value as undefined
            (this as any)[property] = undefined;
        } else {
            // Create the proxy
            let {proxy, revoke} = this.createProxy(newValue, () => { (this as any)[property + "Update"](); });

            // Set the proxy to the property
            (this as any)[property] = proxy;

            // Save the revocable
            this.propertyRevocables[property] = revoke;
        }

        // Automatically call the update function
        if (autoCall) {
            (this as any)[property + "Update"]();
        }
    }
}
