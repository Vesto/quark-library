import { Event, EventPhase } from "./Event";
import { Point } from "../../types/Point";

/*
Touch is for touchscreen, stylus is for touchscreen and eventually real styluses
Hover is just mouse hovering
Left mouse, right mouse, other mouse actual clicks
 */
export enum InteractionType {
    Touch, Stylus,
    Hover,
    LeftMouse, MiddleMouse, RightMouse, OtherMouse
}

export class InteractionEvent extends Event {
    public constructor(
        time: number,
        rawEvent: any,
        public readonly type: InteractionType,
        public readonly phase: EventPhase,
        public readonly location: Point, // Location in root view
        public readonly count: number,
        public readonly id: number, // ID of the touch
        public readonly pressure: number
    ) {
        super(time, rawEvent);
    }
}
