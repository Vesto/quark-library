import { Action } from "../actions/Action";
import { Window } from "../ui/Window";

import { ToolbarItem } from "../ui/ToolbarItem";

export interface ModuleDelegate {
    new(): ModuleDelegate;

    /// Returns a list of ToolbarItems to put in the toolbar. Called before launch.
    createActions(): Action[];

    toolbarItems(actions: Action[]): ToolbarItem[];

    /// Called when the module should create the interface.
    createInterface(window: Window): void;
}
