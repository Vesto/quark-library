import { View, ViewBacking } from "./View";
import { Image } from "../../types/Image";
import { Control, ControlBacking } from "./Control";

export class SegmentItem {
    constructor(
        public readonly isEnabled: boolean,
        public readonly content: Image | string,
        public readonly width: number // Width weight, if all components are = to 1, they'd have the same width
    ) {

    }
}

export interface SegmentedControlBacking extends ViewBacking, ControlBacking {
    qk_setSegments(segments: SegmentItem[]): void;
    qk_setSelectedIndex(index: number | undefined): void;
}

export class SegmentedControl extends View implements Control {
    public static createBacking: () => SegmentedControlBacking;
    public get segmentedControlBacking(): SegmentedControlBacking { return this.backing as SegmentedControlBacking; }

    private _isEnabled: boolean;
    public get isEnabled(): boolean { return this._isEnabled; }
    public set isEnabled(enabled: boolean) { this.segmentedControlBacking.qk_setIsEnabled(enabled); this._isEnabled = enabled; }

    // If the control is momentary
    private _isMomentary: boolean;
    public get isMomentary(): boolean { return this._isMomentary; }
    public set isMomentary(momentary: boolean) {
        // Save momentary
        this._isMomentary = momentary;

        // Remove index if is momentary
        if (momentary && typeof this.selectedIndex !== "undefined") {
            this.selectedIndex = undefined;
        }
    }

    // List of segments
    private _segments: SegmentItem[] = []; // TODO: Proxy the array and backing instead of adding add and remove methods
    public get segments(): SegmentItem[] { return this._segments; };
    // public set segments(segments: SegmentItem[]) { this._segments = segments; }

    // Currently selected index. When one of the segments are tapped, the backing sets `selectedIndex`.
    private _selectedIndex: number | undefined; // undefined for non selected
    public get selectedIndex(): number | undefined { return this._selectedIndex; }
    public set selectedIndex(index: number | undefined) {
        // Save the index if not momentary
        if (this.isMomentary) {
            this._selectedIndex = undefined;
        } else {
            this._selectedIndex = index;
        }

        // Tell the backing
        this.segmentedControlBacking.qk_setSelectedIndex(index);

        // Call the callback
        if (this.onSelection) {
            this.onSelection(this, index);
        }
    }

    // Called when an item is tapped. This will be called, even if there is no change in the selected index. `index`
    // will not always equal `control.index` if it's momentary, since `index` will stay `undefined`, since nothing is
    // selected.
    public onSelection?: (control: SegmentedControl, index: number | undefined) => void;

    public constructor(backing?: SegmentedControlBacking) {
        super(backing ? backing : SegmentedControl.createBacking());

        // Set default values
        this.clearSegments();
    }

    public appendSegment(segment: SegmentItem) { // TODO: Segment index
        // Add the segment
        this._segments.push(segment);

        // Validate index
        this.validateIndex();

        // Update the segments
        this.segmentedControlBacking.qk_setSegments(this.segments);
    }

    public appendSegments(...segments: SegmentItem[]) { // Add segments to the end
        // Add all the indexes
        for (let segment of segments) {
            this.appendSegment(segment);
        }
    }

    public removeSegment(segment: SegmentItem) {
        // Remove the hook if it exists
        let index = this._segments.indexOf(segment);
        if (index >= 0) {
            this._segments.splice(index, 1);
        }

        // Validate index
        this.validateIndex();

        // Update the segments
        this.segmentedControlBacking.qk_setSegments(this.segments);
    }

    public clearSegments() {
        this._segments = [];
        this.segmentedControlBacking.qk_setSegments(this._segments);
    }

    // Adjusts the index appropriately so it deselects if outside of segment bounds
    private validateIndex() {
        // Deselect the segment if it's out of bounds
        if (this.selectedIndex >= this.segments.length || this.selectedIndex < 0) {
            this.selectedIndex = undefined;
        }
    }
}
