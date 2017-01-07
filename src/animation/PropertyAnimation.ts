import { Interpolatable, AnimationLoop, Cloneable } from "quark-core";
import { AnimationGrouping } from "./AnimationGrouping";
import { Animation } from "./Animation";

export class PropertyAnimation<T extends Interpolatable & Cloneable> implements Animation {
    public target: any;
    public property: string;

    public group?: AnimationGrouping;
    public finishCallback?: (animation: Animation) => void;

    private elapsedTime: number = 0;
    public running: boolean = false;
    public get progress(): number { return this.elapsedTime / this.duration; };
    public duration: number = 0;

    public from?: T; // Set as undefined to automatically capture it on `start`
    public to?: T;

    private animationHook?: (dt: number) => void;

    public start(): void {
        // Make sure it's not running already
        if (this.running) { return; }

        // Check to see if there is a to value
        if (!this.to) { throw new Error("`to` value undefined on animation."); }

        // Validate the property
        let targetProperty = this.target[this.property] as T;
        if (!targetProperty) { throw new Error(`Incorrect property type ${this.target[this.property]}.`); }

        // Set the starting value if doesn't exist already
        if (!this.from) { this.from = targetProperty; }

        // Clone the from value so it can't be manipulated
        this.from = this.from.clone() as T;

        // Clone the to value so it can't be manipulated
        this.to = this.to.clone() as T;

        // Hook into the animation loop
        this.animationHook = dt => this.update(dt);
        AnimationLoop.addHook(this.animationHook);

        // Set running
        this.running = true;
    }

    private finish(): void {
        // Stop running
        this.running = false;

        // Remove the hook
        if (this.animationHook) {
            AnimationLoop.removeHook(this.animationHook);
            this.animationHook = undefined;
        }

        // Notify group
        if (this.group) {
            this.group.animationFinished(this);
        }

        // Call callback
        if (this.finishCallback) {
            this.finishCallback(this);
        }
    }

    private update(deltaTime: number) {
        // Increase the elapsed time
        this.elapsedTime += deltaTime;
        this.elapsedTime = Math.min(this.elapsedTime, this.duration); // Clamp to the duration

        // Interpolate the value
        if (!this.from || !this.to) { return; }
        this.target[this.property] = this.from.interpolate(this.to, this.progress);

        // Finish if the elapsed time is greater than the duration
        if (this.elapsedTime >= this.duration) {
            this.finish();
            return;
        }
    }
}
