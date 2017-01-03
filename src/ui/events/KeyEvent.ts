import { Event } from "./Event";

export enum KeyPhase {
    Down, Repeat, Up
}

export enum KeyModifier {
    Control, Option, Meta, Shift, CapsLock
}

export class KeyEvent extends Event {
    public constructor(
        time: number,
        rawEvent: any,
        public readonly phase: KeyPhase,
        public readonly keyCode: number, // https://www.npmjs.com/package/keycode
        public readonly modifiers: KeyModifier[]
    ) {
        super(time, rawEvent);
    }

    // TODO: get key name, maybe pass from name since key maps are unique?
}
