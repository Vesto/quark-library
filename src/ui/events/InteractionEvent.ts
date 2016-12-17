import { Event, EventPhase } from "./Event";
import { Point } from "../../types/Point";

/*
Touch is for touchscreen, stylus is for touchscreen and eventually real styluses
Hover is just mouse hovering
Left mouse, right mouse, other mouse actual clicks
 */
export enum InteractionType {
    Touch, Stylus,
    Hover, LeftMouse, RightMouse, OtherMouse
}

export class InteractionEvent extends Event {
    public constructor(
        time: number,
        public readonly type: InteractionType,
        public readonly phase: EventPhase,
        public readonly location: Point,
        public readonly count: number,
        public readonly pressure: number
    ) {
        super(time);
    }
}
