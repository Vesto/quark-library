import { View, ViewBacking } from "./View";
import { Rect } from "../../types/Rect";
import { Appearance } from "../Appearance";

export class RootView extends View {
    public constructor(backing: ViewBacking) {
        super(backing);

        this.appearance = Appearance.defaultAppearance;
    }

    // Don't allow manipulation of the rect and just return the size rect
    public get rect(): Rect { return this._rect; }
    public set rect(rect: Rect) { this._rect = rect.bounds; }

    public get superview(): View | undefined {
        return undefined;
    }

    public removeFromSuperview(): void {
        // Do nothing since root
    }
}
