import { Event, EventPhase } from "./Event";
import { Point, Vector } from "quark-core";

export class ScrollEvent extends Event {
    public constructor(
        time: number,
        rawEvent: any,
        public readonly location: Point, // Location in root view
        public readonly deltaScroll: Vector
    ) {
        super(time, rawEvent);
    }
}
