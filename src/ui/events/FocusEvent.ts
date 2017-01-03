import { Event } from "./Event";

export class FocusEvent extends Event {
    public constructor(
        time: number,
        rawEvent: any,
        public focused: boolean
    ) {
        super(time, rawEvent);
    }
}
