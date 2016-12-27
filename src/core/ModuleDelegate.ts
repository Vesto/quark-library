import { Action } from "../actions/Action";
import { Window } from "../ui/Window";

import { ToolbarItem } from "../ui/ToolbarItem";
import { EventResponder } from "../ui/events/EventResponder";
import { Module } from "./Module";

export interface ModuleDelegate extends EventResponder {
    /// Returns a list of actions to put in the toolbar.
    createActions(): Action[];

    /// Returns a list of toolbar items to put in the toolbar.
    toolbarItems(actions: Action[]): ToolbarItem[];

    /// Called when the module should create the interface.
    createInterface(window: Window): void;
}

export interface ModuleDelegateConstructor {
    new(): ModuleDelegate;
}
