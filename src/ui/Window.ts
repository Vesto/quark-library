import { View } from "./views/View";
import { Sidebar } from "./Sidebar";
import { ToolbarItem } from "./ToolbarItem";
import { Theme } from "./Theme";
import { Point } from "../types/Point";

export class Window {
    // get rootView(): View { return this.window.jsRootView.jsView; }
    // set rootView(newValue: View) { this.window.jsRootView = newValue.view; }

    public theme: Theme;

    public readonly toolbarItems: ToolbarItem[];

    public readonly leftSidebars: Sidebar[];
    public readonly rightSidebars: Sidebar[];

    constructor() {

    }

    public popover(view: View, from: View | Point): void {
        // May add popover side, presentation style (popover or modal)
    }

    public alert(title: string, description: string, options: string[]) {
        // TODO: Design a better API for this
    }
}
