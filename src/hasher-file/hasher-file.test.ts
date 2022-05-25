import { assert } from 'chai';
import { rm } from 'fs/promises';

import { HasherFile } from './hasher-file.js';
import { Hasher, Variants } from '../hasher/index.js';

describe('Testing "./hasher-file"', () => {
    const file = new HasherFile('./test.argon2');
    after(async () => rm(file.path));

    describe('salt length =  16; default config', () => {
        const target = new Hasher(16);

        it('Save the file', async () => {
            await file.save(target);
        });
    
        it('Load the file', async () => {
            const { options, salt } = await file.load();
            assert.strictEqual(options.hashLength, 32);
            assert.strictEqual(options.memoryCost, 4096);
            assert.strictEqual(options.parallelism, 1);
            assert.strictEqual(options.timeCost, 3);
            assert.strictEqual(options.type, Variants.Argon2i);
            assert.deepEqual(salt, target.salt);
        });
    });

    describe('salt length =  32; custom config 01', () => {
        const target = new Hasher(32, {
            hashLength: 64,
            memoryCost: 2048,
            parallelism: 4,
            timeCost: 9,
            type: Variants.Argon2id,
        });

        it('Save the file', async () => {
            await file.save(target);
        });
    
        it('Load the file', async () => {
            const { options, salt } = await file.load();
            assert.strictEqual(options.hashLength, 64);
            assert.strictEqual(options.memoryCost, 2048);
            assert.strictEqual(options.parallelism, 4);
            assert.strictEqual(options.timeCost, 9);
            assert.strictEqual(options.type, Variants.Argon2id);
            assert.deepEqual(salt, target.salt);
        });
    });

    describe('salt length =  64; custom config 02', () => {
        const target = new Hasher(64, {
            hashLength: 128,
            memoryCost: 1024,
            parallelism: 84,
            timeCost: 18,
            type: Variants.Argon2d,
        });

        it('Save the file', async () => {
            await file.save(target);
        });
    
        it('Load the file', async () => {
            const { options, salt } = await file.load();
            assert.strictEqual(options.hashLength, 128);
            assert.strictEqual(options.memoryCost, 1024);
            assert.strictEqual(options.parallelism, 84);
            assert.strictEqual(options.timeCost, 18);
            assert.strictEqual(options.type, Variants.Argon2d);
            assert.deepEqual(salt, target.salt);
        });
    });

    describe('salt length = 128; custom config 03', () => {
        const target = new Hasher(128, {
            hashLength: 256,
            memoryCost: 3660,
            parallelism: 4,
            timeCost: 24,
            type: Variants.Argon2i,
        });

        it('Save the file', async () => {
            await file.save(target);
        });
    
        it('Load the file', async () => {
            const { options, salt } = await file.load();
            assert.strictEqual(options.hashLength, 256);
            assert.strictEqual(options.memoryCost, 3660);
            assert.strictEqual(options.parallelism, 4);
            assert.strictEqual(options.timeCost, 24);
            assert.strictEqual(options.type, Variants.Argon2i);
            assert.deepEqual(salt, target.salt);
        });
    });
});