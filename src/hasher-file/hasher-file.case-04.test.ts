import test from 'ava';
import { rm } from 'fs/promises';

import { HasherFile } from './hasher-file.js';
import { Hasher, Variants } from '../hasher/index.js';

const txt = 'salt length = 128; custom config 03';
const file = new HasherFile('./test.case-02.argon2');
const target = new Hasher(128, {
    hashLength: 256,
    memoryCost: 3660,
    parallelism: 4,
    timeCost: 24,
    type: Variants.Argon2i,
});

test.after(() => rm(file.path));

test.serial(`${txt}; () => Save the file`, async t => {
    await file.save(target);
    t.pass();
});

test.serial(`${txt}; () => Load the file`, async t => {
    const { options, salt } = await file.load();
    t.is(options.hashLength, 256);
    t.is(options.memoryCost, 3660);
    t.is(options.parallelism, 4);
    t.is(options.timeCost, 24);
    t.is(options.type, Variants.Argon2i);
    t.deepEqual(salt, target.salt);
});