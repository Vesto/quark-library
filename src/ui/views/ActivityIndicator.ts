import { View } from "./View";

export enum ActivityIndicatorStyle { Small, Large }

export class ActivityIndicator extends View {
    public isActive: boolean; // If spinning // TODO: Implement
    public style: ActivityIndicatorStyle; // Maybe make this more sexy somehow? // TODO: Implement
}