export class UnsupportedTypeError extends Error {
    constructor() {
        super('The provided object isn\'t supported by this library');
    }
}
