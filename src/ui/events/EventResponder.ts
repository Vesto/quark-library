import { InteractionEvent } from "./InteractionEvent";
import { KeyEvent } from "./KeyEvent";
import { ScrollEvent } from "./ScrollEvent";

export interface EventResponder { // Returns if the event is absorbed
    interactionEvent?(event: InteractionEvent): boolean;
    keyEvent?(event: KeyEvent): boolean;
    scrollEvent?(event: ScrollEvent): boolean;
}