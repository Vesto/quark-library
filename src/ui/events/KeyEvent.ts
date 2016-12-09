import { Event } from "./Event";
import keycode = require("keycode");

export enum KeyPhase {
    KeyDown, KeyUp
}

export enum KeyModifier {
    Control, Option, Meta, Shift, CapsLock
}

export class KeyEvent extends Event {
    public constructor(
        time: number,
        public readonly phase: KeyPhase,
        public readonly isRepeat: boolean,
        public readonly keyCode: number, // https://www.npmjs.com/package/keycode
        public readonly modifiers: KeyModifier[]
    ) {
        super(time);
    }

    get keyName(): string {
        // Convert the key code to the key name
        return keycode(this.keyCode);
    }
}
