import { View, ViewBacking } from "./View";
import { Image } from "../../types/Image";
import { Point } from "../../types/Point";
import { Size } from "../../types/Size";
import { Color } from "../../types/Color";

export type ImageScalingMode = "none" | "fill" | "aspect-fit" | "aspect-fill" | Size; // Size is percentage of parent in x and y
export interface ImageViewBacking extends ViewBacking {
    qk_setImage(image: Image | undefined): void;
    qk_setScalingMode(mode: ImageScalingMode): void;
    qk_setAlignment(alignment: Point): void;
}

export class ImageView extends View {
    public static createBacking: () => ImageViewBacking;
    public get imageViewBacking(): ImageViewBacking { return this.backing as ImageViewBacking; }

    private _image?: Image;
    public get image(): Image | undefined { return this._image; }
    public set image(image: Image | undefined) { this.proxyProperty("_image", image); }
    private _imageUpdate() { this.imageViewBacking.qk_setImage(this._image); }

    private _scalingMode: ImageScalingMode;
    public get scalingMode(): ImageScalingMode { return this._scalingMode; }
    public set scalingMode(mode: ImageScalingMode) { this.proxyProperty("_scalingMode", mode); }
    private _scalingModeUpdate() { this.imageViewBacking.qk_setScalingMode(this._scalingMode); }

    private _alignment: Point; // Percentage
    public get alignment(): Point { return this._alignment; }
    public set alignment(alignment: Point) { this.proxyProperty("_alignment", alignment); }
    private _alignmentUpdate() { this.imageViewBacking.qk_setAlignment(this._alignment); }

    public constructor(backing?: ImageViewBacking) {
        super(backing ? backing : ImageView.createBacking());

        // Set default values
        this.image = undefined;
        this.scalingMode = "fill";
        this.alignment = new Point(0.5, 0.5);

        // Override previous values
        this.backgroundColor = new Color(0, 0, 0, 0);
    }
}
