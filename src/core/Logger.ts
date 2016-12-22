export class Logger {
    // TODO: Look at how console.log is done
    // TODO: Rename to Log or create a standard Output class and have an Output for the console

    public static qk_output: (messages: any[]) => void;

    /// Prints text to the console with a new line.
    public static print(...messages: any[]) {
        this.output(messages);
    }

    /// Outputs raw text to the console.
    public static output(messages: any[]) {
        this.qk_output(messages);
    }
}
