import { Options } from './options.js';

export interface Hashed {
    get hash(): Buffer;
    get salt(): Buffer;
    get options(): Options;

    digest(): string;
}
