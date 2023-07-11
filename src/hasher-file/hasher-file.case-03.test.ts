import test from 'ava';
import { rm } from 'fs/promises';

import { HasherFile } from './hasher-file.js';
import { Hasher, Variants } from '../hasher/index.js';

const txt = 'salt length =  64; custom config 02';
const file = new HasherFile('./test.case-02.argon2');
const target = new Hasher(64, {
    hashLength: 128,
    memoryCost: 1024,
    parallelism: 84,
    timeCost: 18,
    type: Variants.Argon2d,
});

test.after(() => rm(file.path));

test.serial(`${txt}; () => Save the file`, async t => {
    await file.save(target);
    t.pass();
});

test.serial(`${txt}; () => Load the file`, async t => {
    const { options, salt } = await file.load();
    t.is(options.hashLength, 128);
    t.is(options.memoryCost, 1024);
    t.is(options.parallelism, 84);
    t.is(options.timeCost, 18);
    t.is(options.type, Variants.Argon2d);
    t.deepEqual(salt, target.salt);
});