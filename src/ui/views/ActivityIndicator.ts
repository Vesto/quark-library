import { View } from "./View";

export class ActivityIndicator extends View {
    public isActive: boolean; // If spinning
    public style: "small" | "large"; // Maybe make this more sexy somehow?
}