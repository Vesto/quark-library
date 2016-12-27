import { View, ViewBacking } from "./View";
import { Rect } from "../../types/Rect";

export class RootView extends View {
    public constructor(backing: ViewBacking) {
        super(backing);

        // Force layout at beginning
        this.layout();
    }

    // Don't allow manipulation of the rect and just return the size rect
    public get rect(): Rect { return this.backing.qk_rect.bounds; }
    public set rect(rect: Rect) { /* Do nothing */ }

    public get superview(): View | undefined {
        return undefined;
    }

    public removeFromSuperview(): void {
        // Do nothing since root
    }
}
