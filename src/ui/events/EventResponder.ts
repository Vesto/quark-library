import { FocusEvent } from "./FocusEvent";
import { InteractionEvent } from "./InteractionEvent";
import { KeyEvent } from "./KeyEvent";
import { ScrollEvent } from "./ScrollEvent";

export interface EventResponder { // Returns if the event is captured
    focusEvent?(event: FocusEvent): boolean
    interactionEvent?(event: InteractionEvent): boolean;
    keyEvent?(event: KeyEvent): boolean;
    scrollEvent?(event: ScrollEvent): boolean;
}
