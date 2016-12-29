import { AnimationGrouping } from "./AnimationGrouping";
import { Animation } from "./Animation";

export class GroupAnimation implements AnimationGrouping {
    public group?: AnimationGrouping;

    public running: boolean = false;

    public get progress(): number {
        if (this.longestAnimation) {
            return this.longestAnimation.progress;
        } else {
            return 1;
        }
    }

    public get duration(): number {
        if (this.longestAnimation) {
            return this.longestAnimation.duration;
        } else {
            return 1;
        }
    }

    public finishCallback?: (animation: Animation) => void;

    public readonly animations: Animation[]; // List of animations
    private get longestAnimation(): Animation | undefined {
        let longest: Animation | undefined;
        for (let a of this.animations) {
            if (longest && a.duration > longest.duration) {
                longest = a;
            }
        }
        return longest;
    }

    constructor(animations: Animation[]) {
        // Save the animations
        this.animations = animations;

        // Assign the animations' group
        for (let animation of animations) {
            animation.group = this;
        }
    }

    public animationFinished(animation: Animation) {
        // Check to see if any animations are running
        let isFinished = true;
        for (let a of this.animations) {
            if (a.running) {
                isFinished = false;
                break;
            }
        }

        // If not, call `finished`
        if (isFinished) {
            this.finished();
        }
    }

    public start(): void {
        // Make sure it's not running already
        if (this.running) { return; }

        // Animate them all
        for (let a of this.animations) {
            a.start();
        }

        // Set running
        this.running = true;
    }

    private finished(): void {
        // Stop running
        this.running = false;

        // Notify group
        if (this.group) {
            this.group.animationFinished(this);
        }

        // Call callback
        if (this.finishCallback) {
            this.finishCallback(this);
        }
    }
}
