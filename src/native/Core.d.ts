import { ModuleDelegate } from "../core/ModuleDelegate";

declare module "quark-native" {
    export class QKLogger {
        public static output(test: string): void;
    }

    export class QKModule {
        public static delegate: ModuleDelegate;
    }
}
