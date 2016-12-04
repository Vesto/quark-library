import { View } from "./views/View";
import { Sidebar } from "./Sidebar";
import { Point } from "../types/Point";
import { ToolbarItem } from "./ToolbarItem";
import { Theme } from "./Theme";

import { QKWindow } from "quark-native";

export class Window {
    protected window: QKWindow;

    get rootView(): View { return this.window.jsRootView; }
    set rootView(newValue: View) { this.window.jsRootView = newValue; }

    public theme: Theme;

    public readonly toolbarItems: ToolbarItem[];

    public readonly leftSidebars: Sidebar[];
    public readonly rightSidebars: Sidebar[];

    constructor(window: QKWindow) {
        this.window = window;
    }

    public popover(view: View, from: View | Point): void {
        // May add popover side, presentation style (popover or modal)
    }

    public alert(title: string, description: string, options: string[]) {
        // TODO: Design a better API for this
    }
}
