import { Timer } from "quark-core";
import { Animation } from "./Animation";
import { AnimationGrouping } from "./AnimationGrouping";

export class DelayAnimation implements Animation {
    public group?: AnimationGrouping;
    public finishCallback?: (animation: Animation) => void;

    private startTime: number;

    public running: boolean = false;
    public get progress(): number { return (Date.now() - this.startTime) / this.duration; };
    public duration: number = 0;

    private timer?: Timer;

    public start(): void {
        // Make sure it's not running already
        if (this.running) { return; }

        // Set the start time
        this.startTime = Date.now();

        // Create a timer
        this.timer = new Timer(this.duration, () => this.finish);
        this.timer.start();

        // Set running
        this.running = true;
    }

    private finish(): void {
        // Stop running
        this.running = false;

        // Remove the timer
        if (this.timer) {
            this.timer.stop();
            this.timer = undefined;
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
}
