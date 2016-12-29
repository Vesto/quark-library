import { View } from "./views/View";
import { Sidebar } from "./Sidebar";
import { ToolbarItem } from "./ToolbarItem";
import { Point } from "../types/Point";

export interface WindowBacking {
     readonly qk_rootView: View;
}

export class Window {
    public readonly backing: WindowBacking;

    get rootView(): View { return this.backing.qk_rootView; }

    public readonly toolbarItems: ToolbarItem[];

    public readonly leftSidebars: Sidebar[];
    public readonly rightSidebars: Sidebar[];

    public constructor(backing: WindowBacking) {
        this.backing = backing;
    }

    public popover(view: View, from: View | Point): void {
        // May add popover side, presentation style (popover or modal)
    }

    public alert(title: string, description: string, options: string[]) {
        // TODO: Design a better API for this
    }
}
