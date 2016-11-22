class Logger {
    // TODO: Look at how console.log is done
    // TODO: Rename to Log or create a standard Output class and have an Output for the console

    /// Prints text to the console with a new line.
    public static print(text: string) {
        this.output(text + "\n");
    }

    /// Outputs raw text to the console.
    public static output(text: string) {
        QKLogger.output(text);
    }
}
