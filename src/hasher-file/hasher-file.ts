import { access, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { Hasher, Options, Variants } from '../hasher/index.js';
import { FileNotFoundError } from './file-not-found-error.js';

export class HasherFile {
    static load(path: string): Promise<Hasher> {
        const file = new HasherFile(path);
        return file.load();
    }

    private _path: string;
    get path(): string {
        return this._path;
    }

    constructor(path: string) {
        this._path = resolve(path);
    }

    private _numberToBuffer(length: number, value: number): Buffer {
        const hex = Math.trunc(
                value > Number.MAX_SAFE_INTEGER
                    ?   Number.MAX_SAFE_INTEGER
                    :   value
            )
            .toString(16)
            .slice(length * -2)
            .padStart(length * 2, '0');

        return Buffer.from(hex, 'hex');
    }

    private _bufferToNumber(byte: Buffer, start: number, length?: number): number {
        const hex = byte
            .slice(start, length ? start + length : undefined)
            .toString('hex');

        return parseInt(hex, 16);
    }

    async exist(): Promise<boolean> {
        try {
            await access(this._path);
            return true;
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                return false;
            } else {
                throw err;
            }
        }
    }

    async save(hasher: Hasher): Promise<void> {
        // Get the options
        const opt = hasher.options;

        // Get stable variables
        const chunks: Buffer[] = [];
        chunks.push(this._numberToBuffer(1, opt.type        ?? Variants.Argon2i));
        chunks.push(this._numberToBuffer(8, opt.hashLength  ?? 32));
        chunks.push(this._numberToBuffer(8, opt.memoryCost  ?? 4096));
        chunks.push(this._numberToBuffer(8, opt.parallelism ?? 1));
        chunks.push(this._numberToBuffer(8, opt.timeCost    ?? 3));

        // Set the salt
        chunks.push(hasher.salt);

        // Save the file
        const byte = Buffer.concat(chunks);
        return writeFile(this._path, byte);
    }

    async load(): Promise<Hasher> {
        try {
            const byte = await readFile(this._path);
            const opts: Partial<Options> = {};
            opts.type        = this._bufferToNumber(byte,           0, 1);
            opts.hashLength  = this._bufferToNumber(byte, (8 * 0) + 1, 8);
            opts.memoryCost  = this._bufferToNumber(byte, (8 * 1) + 1, 8);
            opts.parallelism = this._bufferToNumber(byte, (8 * 2) + 1, 8);
            opts.timeCost    = this._bufferToNumber(byte, (8 * 3) + 1, 8);
    
            const salt = byte.slice((8 * 4) + 1);
            return new Hasher(salt, opts);

        } catch (err: any) {
            if (err.code === 'ENOENT') {
                throw new FileNotFoundError(this._path);
            } else {
                throw err;
            }
        }
    }
}
