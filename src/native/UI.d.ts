import { View } from "../ui/views/View";

declare module "quark-native" {
    export class QKWindow {
        public jsRootView: View;
    }
}
