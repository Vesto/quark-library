class View {
    private view: QKView;

    /* Positioning */
    get rect(): Rect {
        return Rect.fromQKRect(this.view.rect);
    }
    set rect(rect: Rect) {
        this.view.rect = rect.qkRect;
    }

    /* View hierarchy */
    get superview(): View | undefined {
        if (this.view.superview) {
            return View.fromQKView(this.view.superview);
        } else {
            return undefined;
        }
    }

    get subviews(): View[] {
        return this.view.subviews.map(
            function(qkView){
                return View.fromQKView(qkView);
            }
        );
    }

    /* Events */
    /// Override point for subviews of a View.
    public layout() {
        Logger.print("hi");
    }

    /* Conversion */
    public static fromQKView(qkView: QKView): View {
        // TODO: Do this
        return new View();
    }
}
