import { View, ViewBacking } from "./View";
import { Image } from "../../types/Image";

export enum ImageScalingMode {
    ScaleToFill, ScaleAspectFit, ScaleAspectFill,
    Center, Left, Right, Top, Bottom,
    TopLeft, TopRight, BottomLeft, BottomRight
}

export interface ImageViewBacking extends ViewBacking {
    qk_setImage(image: Image | undefined): void;
    qk_setScalingMode(mode: ImageScalingMode): void;
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
    public set scalingMode(mode: ImageScalingMode) { this._scalingMode = mode; this.imageViewBacking.qk_setScalingMode(mode); }

    public constructor(backing?: ImageViewBacking) {
        super(backing ? backing : ImageView.createBacking());

        // Set default values
        this.image = undefined;
        this.scalingMode = ImageScalingMode.ScaleToFill;
    }
}