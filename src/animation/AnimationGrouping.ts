import { Animation } from "./Animation";

export interface AnimationGrouping extends Animation { // Interface for animation groups (sequence and group)
    animationFinished(animation: Animation): void; // Called by children animations
}
