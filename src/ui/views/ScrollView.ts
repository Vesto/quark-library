import { View } from "./View";
import { Point } from "../../types/Point";
import { Edges } from "../../types/Edges";
import { Size } from "../../types/Size";

export class ScrollView extends View {
    public contentView: View; // Size of view determines the scroll view content size

    public scrollOffset: Point; // How much scrolled
    public contentInset: Edges;

    public scrollingEnabled: boolean;
    public bouncesHorizontally: boolean;
    public bouncesVertically: boolean;
}
