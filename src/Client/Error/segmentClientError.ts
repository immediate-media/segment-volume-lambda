export class SegmentClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name; // Set the error name to the class name
        Object.setPrototypeOf(this, SegmentClientError.prototype); // Set the prototype to CustomError
    }
}
