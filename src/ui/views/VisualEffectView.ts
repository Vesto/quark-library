import { View } from "./View";

export enum VisualEffectStyle {
    Light, Dark
}

// Blur on macOS and iOS, shadowed box on Android, just bordered on Windows
export class VisualEffectView extends View {
    public style: VisualEffectStyle; // TODO: Implement
}
