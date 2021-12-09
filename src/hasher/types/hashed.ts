import { Options } from './options';

export interface Hashed {
    get hash(): Buffer;
    get salt(): Buffer;
    get options(): Options;

    digest(): string;
}
