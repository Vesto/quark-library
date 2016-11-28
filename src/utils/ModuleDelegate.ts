import { Action } from "../actions/Action";
import { Window } from "../ui/Window";

import { ToolbarItem } from "../ui/ToolbarItem";

export interface ModuleDelegate {
    new(): ModuleDelegate;

    /// Returns a list of actions to put in the toolbar.
    createActions(): Action[];

    /// Returns a list of toolbar items to put in the toolbar.
    toolbarItems(actions: Action[]): ToolbarItem[];

    /// Called when the module should create the interface.
    createInterface(window: Window): void;
}
