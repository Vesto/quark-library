import { Point } from "../../types/Point";
import { Event, EventPhase } from "./Event";
import { Vector } from "../../types/Vector";

export class ScrollEvent extends Event {
    public constructor(
        time: number,
        public readonly phase: EventPhase,
        // public readonly momentumPhase: EventPhase, // On macOS when scrolling, there is momentum when decelerating
        public readonly location: Point,
        public readonly deltaScroll: Vector
    ) {
        super(time);
    }
}
