import { Image } from "../types/Image";
import { View } from "./views/View";

export abstract class Sidebar {
    public readonly image: Image;

    /// If the sidebar displaces the window's content or simply overlays it.
    public displaces: boolean;

    constructor(image: Image) {
        this.image = image;
    }

    public abstract createInterface(parentView: View): void;
}