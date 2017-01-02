import { View, ViewBacking } from "./View";
import { Point } from "../../types/Point";
import { Size } from "../../types/Size";

export interface ScrollViewBacking extends ViewBacking {
    qk_onScrollCallback: (offset: Point) => void;

    qk_setContentSize(size: Size): void;
    qk_setContentOffset(offset: Point): void;
    qk_setScrollsHorizontally(scrolls: boolean): void;
    qk_setScrollsVertically(scrolls: boolean): void;
}

export class ScrollView extends View {
    public static createBacking: () => ScrollViewBacking;
    public get scrollViewBacking(): ScrollViewBacking { return this.backing as ScrollViewBacking; }

    private _contentSize: Size;
    public get contentSize(): Size { return this._contentSize; }
    public set contentSize(size: Size) { this.proxyProperty("_contentSize", size); }
    private _contentSizeUpdate() { this.scrollViewBacking.qk_setContentSize(this._contentSize); }

    private _contentOffset: Point;
    public get contentOffset(): Point { return this._contentOffset; }
    public set contentOffset(offset: Point) { this.proxyProperty("_contentOffset", offset); }
    private _contentOffsetUpdate() { this.scrollViewBacking.qk_setContentOffset(this._contentOffset); }

    private _scrollsHorizontally: boolean;
    public get scrollsHorizontally(): boolean { return this._scrollsHorizontally; }
    public set scrollsHorizontally(scrolls: boolean) { this._scrollsHorizontally = scrolls; this.scrollViewBacking.qk_setScrollsHorizontally(scrolls); }

    private _scrollsVertically: boolean;
    public get scrollsVertically(): boolean { return this._scrollsVertically; }
    public set scrollsVertically(scrolls: boolean) { this._scrollsVertically = scrolls; this.scrollViewBacking.qk_setScrollsVertically(scrolls); }

    public onScroll?: (scrollView: ScrollView, offset: Point) => void;

    public constructor(backing?: ScrollViewBacking) {
        super(backing ? backing : ScrollView.createBacking());

        // Set backing callback
        this.scrollViewBacking.qk_onScrollCallback = offset => this.scrolled(offset);

        // Set default values
        this.contentSize = Size.zero;
        this.contentOffset = Point.zero;
        this.scrollsHorizontally = false;
        this.scrollsVertically = true;
    }

    // Called by backing
    private scrolled(offset: Point) {
        // Proxy the property and don't call the update function
        this.proxyProperty("_contentOffset", offset, false);

        // Call the scroll event
        if (this.onScroll) {
            this.onScroll(this, offset);
        }
    }
}
