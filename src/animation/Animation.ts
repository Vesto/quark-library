import { AnimationGrouping } from "./AnimationGrouping";

export interface Animation {
    group?: AnimationGrouping; // The animation group this animation belongs to
    finishCallback?: (animation: Animation) => void;

    readonly running: boolean;
    readonly progress: number; // Percentage from 0 to 1
    readonly duration: number; // Delay in seconds

    start(): void;
}
