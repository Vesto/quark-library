import View from "../UI/View";

// TODO: Store the JS value for the view in the QKView object
export declare class QKView {
    /* JavaScript Interop */
    jsView?: View
    
    /* Positioning */
    jsRect: Rect

    /* View hierarchy */
    readonly jsSubviews: View[]
    readonly jsSuperview?: View
    jsAddSubview(view: View): void
    jsRemoveFromSuperview(): void
    
    /* Events */
    
    /* Layout */
    
    /* Visibility */
    jsHidden: boolean
    
    /* Style */
    jsBackgroundColor: Color
    jsAlpha: number
    jsShadow: Shadow
    jsCornerRadius: number
    
    /* Initiator */
    /// Creates a new view with a JSView.
    constructor()
}

export declare class QKButton extends QKView {
    jsTitle: string;
}
