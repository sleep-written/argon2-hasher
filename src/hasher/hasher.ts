import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';

import { Options, Hashed, Variants } from './interfaces/index.js';
import { InvalidHashParamError } from './invalid-hash-param-error.js';
import { HasherResponse } from './hasher-response.js';
import { stringify } from '../stringify/index.js';

export class Hasher {
    private _options: Options;
    get options(): Options {
        return { ...this._options };
    }

    private _salt: Buffer;
    get salt(): Buffer {
        return this._salt;
    }

    constructor(salt: Buffer, options?: Partial<Options>);
    constructor(saltLength: number, options?: Partial<Options>)
    constructor(arg: number | Buffer, options?: Partial<Options>) {
        if (typeof arg === 'number') {
            this._salt = randomBytes(arg);
        } else {
            this._salt = arg;
        }

        this._options = {
            hashLength: options?.hashLength ?? 32,
            memoryCost: options?.memoryCost ?? 4096,
            parallelism: options?.parallelism ?? 1,
            timeCost: options?.timeCost ?? 3,
            type: options?.type ?? Variants.Argon2i
        };
    }

    static verify(digested: string, input: any): Promise<boolean>;
    static verify(hashed: Hashed, input: any): Promise<boolean>;
    static verify(arg: string | Hashed, input: any): Promise<boolean> {
        // Process the hashed object or the digest
        let digested: string;
        if (arg instanceof HasherResponse) {
            digested = arg.digest();
        } else if (typeof arg === 'string') {
            digested = arg;
        } else {
            throw new InvalidHashParamError();
        }

        // Process the input parameter
        let rawInput: Buffer;
        if (Buffer.isBuffer(input)) {
            rawInput = input;
        } else if (typeof input === 'string') {
            rawInput = Buffer.from(input, 'utf-8');
        } else {
            const str = stringify(input);
            rawInput = Buffer.from(str, 'utf-8');
        }

        // Execute the real verify method
        return verify(digested, rawInput);
    }

    async compare(a: any, b: any): Promise<boolean> {
        const strA = stringify(a);
        const strB = stringify(b);

        const hashedA = await this.hash(strA);
        const hashedB = await this.hash(strB);

        return Buffer.compare(hashedA.hash, hashedB.hash) === 0;
    }

    async hash(input: any): Promise<Hashed> {
        let value: Buffer;
        if (Buffer.isBuffer(input)) {
            value = input;
        } else if (typeof input === 'string') {
            value = Buffer.from(input, 'utf-8');
        } else {
            const str = stringify(input);
            value = Buffer.from(str, 'utf-8');
        }

        const byte = await hash(value, {
            ...this._options,
            saltLength: this._salt.length,
            salt: this._salt,
            raw: true
        });

        return new HasherResponse(byte, this._salt, this._options);
    }

    verify(hash: Buffer, input: any): Promise<boolean> {
        const hashed = new HasherResponse(hash, this._salt, this._options);
        const digest = hashed.digest();
        return verify(digest, input);
    }
}
