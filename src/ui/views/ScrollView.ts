import { View } from "./View";
import { Point } from "../../types/Point";
import { Edges } from "../../types/Edges";

export class ScrollView extends View {
    public contentView: View; // Size of view determines the scroll view content size // TODO: Implement

    public scrollOffset: Point; // How much scrolled // TODO: Implement
    public contentInset: Edges; // TODO: Implement

    public scrollingEnabled: boolean; // TODO: Implement
    public bouncesHorizontally: boolean; // TODO: Implement
    public bouncesVertically: boolean; // TODO: Implement
}
