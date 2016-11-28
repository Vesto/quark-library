import { Image } from "../types/Image";
import { View } from "./views/View";

export abstract class Sidebar {
    public readonly image: Image;

    constructor(image: Image) {
        this.image = image;
    }

    public abstract createInterface(parentView: View): void;
}