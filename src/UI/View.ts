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
    get subviews(): View[] {
        return this.view.subviews.map(
            function(qkView){
                return View.fromQKView(qkView);
            }
        );
    }

    /* Events */
    public layout() {
        // QKLogger.output("hi");
        Logger.print("hi");
    }

    /* Conversion */
    public static fromQKView(qkView: QKView): View {
        // TODO: Do this
        return new View();
    }
}
