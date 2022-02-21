import { Hashed, Hasher, Options } from '../hasher';
import { stringify } from '../stringify';

export class JsonHasher {
    private _hasher: Hasher;

    get options(): Options {
        return this._hasher.options;
    }

    get salt(): Buffer {
        return this._hasher.salt;
    }

    constructor(salt: Buffer, options?: Partial<Options>);
    constructor(saltLength: number, options?: Partial<Options>);
    constructor(arg: number | Buffer, options?: Partial<Options>) {
        this._hasher = new Hasher(arg as any, options);
    }

    static verify(hashed: Hashed, input: any): Promise<boolean> {
        const str = stringify(input);
        return Hasher.verify(hashed, str);
    }

    async areEqual(a: any, b: any): Promise<boolean> {
        const strA = stringify(a);
        const strB = stringify(b);

        const hashedA = await this._hasher.hash(strA);
        const hashedB = await this._hasher.hash(strB);

        return Buffer.compare(hashedA.hash, hashedB.hash) === 0;
    }

    hash(input: string | Buffer): Promise<Hashed> {
        return this._hasher.hash(input);
    }

    verify(hash: Buffer, input: any): Promise<boolean> {
        const str = stringify(input);
        return this._hasher.verify(hash, str);
    }
}
