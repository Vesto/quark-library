
interface QKFrameChangeFunction {
    (view: QKView): never
}

interface QKView {
    /* Positioning */
    rect: QKRect;

    /* View hierarchy */
    readonly subviews: [QKView];
    readonly superview: QKView | undefined;
    addSubview(view: QKView);
    removeFromSuperview();

    /* Events */


    /* Layout */
    frameChangedHandler: QKFrameChangeFunction | undefined

    /* Visibility */
    hidden: boolean

    /* Style */
    backgroundColor: QKColor
    alpha: number
    shadow: QKShadow
    cornerRadius: number

    /* Initiator */
    constructor()
}

