import { View, ViewBacking } from "./View";
import { Rect } from "../../types/Rect";
import { Appearance } from "../Appearance";

export interface RootViewBacking extends ViewBacking {

}

export class RootView extends View {
    public get segmentedControlBacking(): RootViewBacking { return this.backing as RootViewBacking; }

    public constructor(backing: RootViewBacking) { // Don't allow a custom backing
        super(backing);

        this.appearance = Appearance.defaultAppearance;
    }

    // When `rect` set, only set the local `rect` since it should only be called from `QKRootView`
    public get rect(): Rect { return this._rect; }
    public set rect(rect: Rect) { this._rect = rect.bounds; }
}
