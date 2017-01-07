/// <reference path="../../utils/typings/autolayout.d.ts" />

import { FocusEvent } from "../events/FocusEvent";
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
import {Constraint} from "../Constraint";
import { PropertyAnimation } from "../../animation/PropertyAnimation";

import AutoLayout = require("autolayout");

import { v4 as UUID } from "uuid";


// Interface for what `quark-native` needs to implement with prototypes
export interface ViewBacking {
    qk_view?: View;

    qk_init(): void;
    qk_appearanceChanged(appearance: Appearance): void; // Appearance callback from view

    qk_setRect(rect: Rect): void;
    qk_layout(): void; // Layout callback from view

    readonly qk_subviews: View[];
    readonly qk_superview: View | undefined;
    qk_addSubview(view: View, index: number): void;
    qk_removeFromSuperview(): void;

    qk_setFocusable(focusable: boolean): void;
    qk_setFocused(focused: boolean): void;

    qk_setIsHidden(hidden: boolean): void;
    qk_setClipSubviews(clip: boolean): void;

    qk_setBackgroundColor(color: Color): void;
    qk_setBackgroundBlur(blur: number): void;
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

    public readonly uuid: string;

    public constructor(backing?: ViewBacking) {
        // Set the uuid
        this.uuid = UUID();

        // Check inside VM, save instance of module backing
        this.module = Module.shared;

        // Initialize and save the backing
        this.backing = backing ? backing : View.createBacking();
        this.backing.qk_view = this;
        this.backing.qk_init();

        // Set the default values on the view if it's new; it is assumed that all views that are used by Quark have
        // to be initialized by Quark.
        this.rect = Rect.zero;
        this.isFocusable = false;
        this.isFocused = false;
        this.isHidden = false;
        this.clipSubviews = true;
        this.backgroundColor = new Color(1, 1, 1, 1);
        this.backgroundBlur = 0;
        this.alpha = 1.0;
        this.shadow = undefined;
        this.cornerRadius = 0;
    }

    /* Appearance */
    protected _appearance: Appearance = new Appearance();
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
    protected _previousRect: Rect = Rect.zero; // The previous rect that was set
    protected _rect: Rect = Rect.zero;
    public get rect(): Rect { return this._rect; }
    public set rect(rect: Rect) { this.proxyProperty("_rect", rect); }
    private _rectUpdate() {
        // Tell QKView
        this.backing.qk_setRect(this._rect);

        // Trigger layout if different view
        if (!this._rect.equals(this._previousRect)) {
            // Save the rect
            this._previousRect = this._rect.clone();

            // Layout this view and the superview
            this.layout();
            // if (this.superview) { this.superview.layout() }
        }
    }

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
        // Add the subivew
        let newIndex = Math.min(Math.max(Math.floor(index), 0), this.subviews.length);
        this.backing.qk_addSubview(view, newIndex);

        // Layout the target and subviews
        // for (let subview of this.subviews) {
        //     subview.layout();
        // }
        // this.layout();

    }

    public addSubview(view: View) { this.addSubviewAt(view, this.subviews.length); }

    public removeFromSuperview() { this.backing.qk_removeFromSuperview(); }

    public movedToSuperview(superview: View | undefined) {
        // Set the appearance to the parent's appearance
        if (superview) {
            this.appearance = superview.appearance;
        }
    }

    /* Focus */
    private _isFocusable: boolean;
    public get isFocusable(): boolean { return this._isFocusable; }
    public set isFocusable(focusable: boolean) {
        this._isFocusable = focusable;
        this.backing.qk_setFocusable(focusable);

        // Blur if not focusable
        if (!focusable) {
            this.isFocused = false;
        }
    }

    private _isFocused: boolean;
    public get isFocused(): boolean { return this._isFocused; }
    public set isFocused(focused: boolean) {
        if (this.isFocusable) {
            this._isFocused = focused;
            this.backing.qk_setFocused(focused);
        }
    }

    /* Events */
    public focusEvent(event: FocusEvent): boolean {
        // Save focused
        this._isFocused = event.focused;

        // Override point
        return false;
    }

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
    /// Override point for subviews of a View. See http://stackoverflow.com/questions/728372/when-is-layoutsubviews-called
    // for when to call `layout`
    public layout() {
        // Call backing's layout
        this.backing.qk_layout();

        // Apply the constraints
        if (this.useAutoLayout)
            this.applyConstraints();

        // Override point
    }

    /* AutoLayout */
    public useAutoLayout: boolean = false;

    private _constraints: Constraint[] = [];
    public get constraints(): Constraint[] { return this._constraints; }

    public addConstraint(constraint: Constraint) {
        // Add the constraint
        this._constraints.push(constraint);
    }

    public addConstraints(constraints: Constraint[]): void {
        for (let constraint of constraints) {
            this.addConstraint(constraint);
        }
    }

    public removeConstraint(constraint: Constraint): void {
        // Remove the constraint if it exists
        let index = this._constraints.indexOf(constraint);
        if (index !== -1) {
            this.constraints.splice(index, 1);
        }
    }

    public removeConstraints(constraints: Constraint[]): void {
        for (let constraint of constraints) {
            this.removeConstraint(constraint);
        }
    }

    // Resizes the views based on the constraints
    public applyConstraints(animates: boolean = false) {
        // Create an auto layout view with all the constraints
        let view = new AutoLayout.View({
            width: this.rect.width,
            height: this.rect.height,
            constraints: this._constraints.map(constraint => constraint.toAutoLayoutConstraint()),
            spacing: this.appearance.spacing
        });

        // Set the frame for every subview if there are constraints for it
        for (let subview of this.subviews) {
            let subviewInfo = view.subViews[subview.uuid];
            if (subviewInfo) { // If the subview has constraints relating to it
                // Create the view's properties
                let newRect = new Rect(
                    subviewInfo.left, subviewInfo.top,
                    subviewInfo.width, subviewInfo.height
                );

                // Make sure there's a change
                if (newRect.equals(subview.rect)) { continue; }

                // Update the properties
                if (animates) {
                    let animation = new PropertyAnimation<Rect>();
                    animation.target = subview;
                    animation.property = "rect";
                    animation.duration = 0.2;
                    animation.to = newRect;
                    animation.start();
                } else { // Instant transition
                    subview.rect = newRect
                }
                // TODO: zIndex
            }
        }
    }



    /* Visibility */
    protected _isHidden: boolean;
    public get isHidden(): boolean { return this._isHidden; }
    public set isHidden(hidden: boolean) { this._isHidden = hidden; this.backing.qk_setIsHidden(hidden); }

    protected _clipSubviews: boolean;
    public get clipSubviews(): boolean { return this._clipSubviews; }
    public set clipSubviews(clip: boolean) { this._clipSubviews = clip; this.backing.qk_setClipSubviews(clip); }

    /* Style */
    protected _backgroundColor: Color;
    public get backgroundColor(): Color { return this._backgroundColor; }
    public set backgroundColor(color: Color) { this.proxyProperty("_backgroundColor", color); }
    private _backgroundColorUpdate() { this.backing.qk_setBackgroundColor(this._backgroundColor); }

    protected _backgroundBlur: number;
    public get backgroundBlur(): number { return this._backgroundBlur; }
    public set backgroundBlur(blur: number) { this.backing.qk_setBackgroundBlur(blur); }

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
        if (typeof newValue === "object") {
            // Create the proxy
            let {proxy, revoke} = this.createProxy(newValue, () => { (this as any)[property + "Update"](); });

            // Set the proxy to the property
            (this as any)[property] = proxy;

            // Save the revocable
            this.propertyRevocables[property] = revoke;
        } else {
            // The new value is undefined or a primitive
            // Remove the proxy
            delete this.propertyRevocables[property];

            // Set the value as undefined
            (this as any)[property] = newValue;
        }

        // Automatically call the update function
        if (autoCall) {
            (this as any)[property + "Update"]();
        }
    }
}
