import { View } from "./views/View";

import { Sidebar } from "./Sidebar";
import { Point } from "../types/Point";
import { ToolbarItem } from "./ToolbarItem";
import { Theme } from "./Theme";

export class Window {
    public rootView: View;

    public theme: Theme;

    public readonly toolbarItems: ToolbarItem[];

    public readonly leftSidebars: Sidebar[];
    public readonly rightSidebars: Sidebar[];

    public popover(view: View, from: View | Point): void {
        // May add popover side, presentation style (popover or modal)
    }

    public alert(title: string, description: string, options: string[]) {
        // TODO: Design a better API for this
    }
}
