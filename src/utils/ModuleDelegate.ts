import { Action } from "../actions/Action";
import { Window } from "../ui/Window";

interface ModuleDelegate {
    new(): ModuleDelegate;

    /// Returns a list of ToolbarItems to put in the toolbar. Called before launch.
    createActions(): Action[];

    /// Called when the module should create the interface.
    createInterface(window: Window): void;
}
