import { View } from "./View";
import { Image } from "../../types/Image";

export class SegmentItem {
    constructor(
        public enabled: boolean,
        public content: Image | string,
        public width: number
    ) {

    }
}

export class SegmentedController extends View {
    public segments: SegmentItem[]; // TODO: Implement

    public selectedIndex: number | undefined; // undefined for non selected // TODO: Implement

    constructor() {
        super();
    }
}