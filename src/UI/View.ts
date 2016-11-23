class View {
    private view: QKView;

    public constructor(view: QKView) {
        this.view = view;
    }

    /* Positioning */
    public get rect(): Rect {
        return Rect.fromQKRect(this.view.rect);
    }
    public set rect(rect: Rect) {
        this.view.rect = rect.qkRect;
    }

    /* View hierarchy */
    public get superview(): View | undefined {
        if (this.view.superview) {
            return new View(this.view.superview);
        } else {
            return undefined;
        }
    }

    public get subviews(): View[] {
        return this.view.subviews.map(
            function(qkView){
                return new View(qkView);
            }
        );
    }

    public addSubview(view: View) {
        this.view.addSubview(view.view);
    }

    public removeFromSuperview() {
        this.view.removeFromSuperview();
    }

    /* Events */

    /* Layout */
    /// Override point for subviews of a View.
    public layout() {
        Logger.print("layout");
    }

    /* Visibility */
    public get hidden(): boolean {
        return this.view.hidden;
    }
    public set hidden(newValue: boolean) {
        this.view.hidden = newValue;
    }

    /* Style */
    public get backgroundColor(): Color {
        return Color.fromQKColor(this.view.backgroundColor);
    }
    public set backgroundColor(newValue: Color) {
        this.view.backgroundColor = newValue.qkColor;
    }

    public get alpha(): number {
        return this.view.alpha;
    }
    public set alpha(newValue: number) {
        this.view.alpha = newValue;
    }

    public get shadow(): Shadow {
        return Shadow.fromQKShadow(this.view.shadow);
    }
    public set shadow(newValue: Shadow) {
        this.view.shadow = newValue.qkShadow;
    }

    public get cornerRadius(): number {
        return this.view.cornerRadius;
    }
    public set cornerRadius(newValue: number) {
        this.view.cornerRadius = newValue;
    }
}
