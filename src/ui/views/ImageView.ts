import { View } from "./View";
import { Image } from "../../types/Image";

export enum ImageScalingMode {
    ScaleToFill, ScaleAspectFit, ScaleAspectFill,
    Center, Left, Right, Top, Bottom,
    TopLeft, TopRight, BottomLeft, BottomRight
}

export class ImageView extends View {
    public image: Image; // TODO: Implement
    public scalingMode: ImageScalingMode; // TODO: Implement
}