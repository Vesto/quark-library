import { View } from "../View";

export class SplitContainer extends View {
    public leftView: View;
    public rightView: View;

    public leftSplitClamp: number; // % from 0 to 1 of how far it can go
    public rightSplitClamp: number;
    public leftSplitPadding: number; // Pixels from side of how far it can be slid
    public rightSplitPadding: number;

    // If the split is collapsible to the left or right side
    // has to collapse if on left margin > width - rightMargin (e.g. on mobile)
    public collapsible: boolean;
}