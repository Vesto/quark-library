import { ModuleDelegate } from "./ModuleDelegate";

export class Module {
    public static get delegate(): ModuleDelegate {
        return { } as ModuleDelegate; // TODO: This
    }
}
