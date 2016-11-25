class View {
    protected view: QKView;

    public constructor(view?: QKView) {
        if (view) {
            this.view = view;
        } else {
            this.view = new QKView();
        }
    }

    /* Positioning */
    public get rect(): Rect { return this.view.jsRect; }
    public set rect(rect: Rect) { this.view.jsRect = rect; }

    /* View hierarchy */
    public get superview(): View | undefined { return this.view.jsSuperview; }
    public get subviews(): View[] { return this.view.jsSubviews; }
    public addSubview(view: View) { this.view.jsAddSubview(view); }
    public removeFromSuperview() { this.view.jsRemoveFromSuperview(); }

    /* Events */

    /* Layout */
    /// Override point for subviews of a View.
    public layout() {
        Logger.print("layout");
    }

    /* Visibility */
    public get hidden(): boolean { return this.view.jsHidden; }
    public set hidden(newValue: boolean) { this.view.jsHidden = newValue; }

    /* Style */
    public get backgroundColor(): Color { return this.view.jsBackgroundColor; }
    public set backgroundColor(newValue: Color) { this.view.jsBackgroundColor = newValue; }

    public get alpha(): number { return this.view.jsAlpha; }
    public set alpha(newValue: number) { this.view.jsAlpha = newValue; }

    public get shadow(): Shadow { return this.view.jsShadow; }
    public set shadow(newValue: Shadow) { this.view.jsShadow = newValue; }

    public get cornerRadius(): number { return this.view.jsCornerRadius; }
    public set cornerRadius(newValue: number) { this.view.jsCornerRadius = newValue; }
}
