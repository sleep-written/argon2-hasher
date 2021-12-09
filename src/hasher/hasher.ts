import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';

import { HasherResponse } from './hasher-response';
import { InvalidHashParamError } from './invalid-hash-param-error';
import { Options, Hashed } from './types';

export class Hasher {
    private _options: Options;
    get options(): Options {
        return { ...this._options };
    }

    private _salt: Buffer;
    get salt(): Buffer {
        return this._salt;
    }


    constructor(salt: Buffer, options?: Options);
    constructor(saltLength: number, options?: Options)
    constructor(arg: number | Buffer, options?: Options) {
        if (typeof arg === 'number') {
            this._salt = randomBytes(arg);
        } else {
            this._salt = arg;
        }

        this._options = { ...options };
    }

    static verify(digested: string, input: string | Buffer): Promise<boolean>;
    static verify(hashed: Hashed, input: string | Buffer): Promise<boolean>;
    static verify(arg: string | Hashed, input: string | Buffer): Promise<boolean> {
        let digested: string;
        if (arg instanceof HasherResponse) {
            digested = arg.digest();
        } else if (typeof arg === 'string') {
            digested = arg;
        } else {
            throw new InvalidHashParamError();
        }

        return verify(digested, input);
    }

    async hash(input: string | Buffer): Promise<Hashed> {
        let value: Buffer;
        if (typeof input === 'string') {
            value = Buffer.from(input, 'utf-8');
        } else {
            value = input;
        }

        const byte = await hash(value, {
            ...this._options,
            saltLength: this._salt.length,
            salt: this._salt,
            raw: true
        });

        return new HasherResponse(byte, this._salt);
    }

    verify(hash: Buffer, input: string | Buffer): Promise<boolean> {
        const hashed = new HasherResponse(hash, this._salt, this._options);
        return verify(hashed.digest(), input);
    }
}
