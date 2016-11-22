class View {
    private view: QKView;

    /* Positioning */
    get rect(): Rect {
        return new Rect(view.rect);
    }
    set rect(rect: Rect) {
        this.view.rect = rect.qkRect;
    }

    /* View hierarchy */
    get subviews(): [View] {
        return this.view.subviews.map(function(qkView){ return View(qkView); });
    }

    /* Events */
    public layout() {
        // QKLogger.output("hi");
        QKLogger.output("hi\n");
    }

}
