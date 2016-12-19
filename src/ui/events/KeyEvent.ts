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

    get keyName(): string {
        // TODO: Do this. This is (I think) platform-dependent, maybe make Quark look this up
        // Look at /System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/Headers/Events.h
        // Maybe have the computer map from a their keymap to a standard keymap (HTML5?)
        // There must be some standard online
        return `<unavailable>`;
    }
}
