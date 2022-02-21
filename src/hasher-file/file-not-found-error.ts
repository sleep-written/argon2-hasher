export class FileNotFoundError extends Error {
    constructor(path?: string) {
        super();

        if (path) {
            this.message =  `The configuration file with path "${path}" `
                        +   'wasn\'t not found.';
        } else {
            this.message =  `The configuration file requested `
                        +   'wasn\'t not found.';
        }
    }
}
