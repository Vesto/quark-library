export enum EventPhase {
    Began, Changed, Stationary, Ended, Cancelled
}

export abstract class Event {
    public constructor(
        public readonly time: number, // In milliseconds
        public readonly rawEvent: any // Data that was used to process the event and may not be handled
    ) {

    }
}
