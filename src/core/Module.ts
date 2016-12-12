import { ModuleDelegate } from "./ModuleDelegate";
import { QKModule } from "quark-native";

export class Module {
    public static get delegate(): ModuleDelegate {
        return QKModule.delegate;
    }
}
