import { Options, Variants } from './interfaces';
import { Hashed } from './interfaces/hashed';

export class HasherResponse implements Hashed {
    private _options: Options;
    get options(): Options {
        return { ...this._options };
    }

    private _hash: Buffer;
    get hash(): Buffer {
        return this._hash;
    }

    private _salt: Buffer;
    get salt(): Buffer {
        return this._salt;
    }

    constructor(hash: Buffer, salt: Buffer, options: Options) {
        this._hash = hash;
        this._salt = salt;
        this._options = { ...options };
    }
    
    digest(): string {
        let out: string;

        // Variant
        switch (this._options.type) {
            case Variants.Argon2d:
                out = '$argon2d';
            case Variants.Argon2id:
                out = '$argon2id';
            default:
                out = '$argon2i';
        }

        // Version
        out += '$v=19';

        // MemoryCost
        out += `$m=${this._options.memoryCost ?? 4096}`;

        // Time cost
        out += `,t=${this._options.timeCost ?? 3}`;

        // Parallelism
        out += `,p=${this._options.parallelism ?? 1}`;

        // Salt
        out += `$${this._salt.toString('base64').replace(/=+$/gi, '')}`;

        // Hash
        out += `$${this._hash.toString('base64').replace(/=+$/gi, '')}`;

        return out;
    }
}
