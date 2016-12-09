export enum EventPhase {
    Began, Changed, Stationary, Ended, Cancelled
}

export abstract class Event {
    public constructor(public readonly time: number) {

    }
}
