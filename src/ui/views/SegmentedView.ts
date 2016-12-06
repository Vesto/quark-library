import { View } from "./View";
import { Image } from "../../types/Image";

export type SegmentItem = string | Image;

export class SegmentedView extends View {
    public segments: SegmentItem[]; // TODO: Implement

    public selectedIndex: number | undefined; // undefined for non selected // TODO: Implement
}