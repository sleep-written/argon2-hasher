export class InvalidHashParamError extends Error {
    constructor() {
        super('The object provided in the "verify" function is invalid.');
    }
}
