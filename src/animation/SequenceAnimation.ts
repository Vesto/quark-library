import { AnimationGrouping } from "./AnimationGrouping";
import { Animation } from "./Animation";

export class SequenceAnimation implements AnimationGrouping {
    public group?: AnimationGrouping;
    public finishCallback?: (animation: Animation) => void;

    public running: boolean = false;

    public get progress(): number {
        let total = 0;
        for (let a of this.animations) {
            if (a.running) {
                total += a.progress * a.duration;
                break;
            } else {
                total += a.duration;
            }
        }
        return total / this.duration;
    }

    public get duration(): number {
        let total = 0;
        for (let a of this.animations) {
            total += a.duration;
        }
        return total;
    }

    public readonly animations: Animation[]; // List of animations
    private animatingIndex: number = -1; // Index of the currently animating animation
    private animateNext() { // Goes to the next animation
        // Animate next one if exists, finish if not
        this.animatingIndex++;
        if (this.animatingIndex < this.animations.length) {
            this.animations[this.animatingIndex].start();
        } else {
            this.finished();
        }
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
        this.animateNext();
    }

    public start(): void {
        if (this.running) { return; } // Make sure it's not running already

        this.animateNext(); // Goes from -1 to 0
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
