import { Window } from "../ui/Window";
import { ModuleDelegate } from "./ModuleDelegate";

export interface ModuleBacking {
    readonly qk_window: Window | undefined;
    readonly qk_delegate: ModuleDelegate;
}

export class Module {
    public static readonly shared = new Module();

    // The backing that this module wraps.
    public backing: ModuleBacking;

    // Properties of the module
    public get window(): Window | undefined { return this.backing.qk_window; }
    public get delegate(): ModuleDelegate { return this.backing.qk_delegate; }
}
