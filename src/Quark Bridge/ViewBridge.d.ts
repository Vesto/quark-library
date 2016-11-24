declare interface QKFrameChangeFunction {
    (view: QKView): never;
}

// TODO: Store the JS value for the view in the QKView object
declare class QKView {
    readonly jsView: View; // Will always be define if accessing from JS

    /* Positioning */
    rect: QKRect;

    /* View hierarchy */
    readonly subviews: [QKView];
    readonly superview: QKView | undefined;
    addSubview(view: QKView): void;
    removeFromSuperview(): void;

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
    constructor(jsView: View)
}
