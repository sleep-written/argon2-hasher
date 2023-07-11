import test from 'ava';
import { rm } from 'fs/promises';

import { HasherFile } from './hasher-file.js';
import { Hasher, Variants } from '../hasher/index.js';

const txt = 'salt length =  32; custom config 01';
const file = new HasherFile('./test.case-02.argon2');
const target = new Hasher(32, {
    hashLength: 64,
    memoryCost: 2048,
    parallelism: 4,
    timeCost: 9,
    type: Variants.Argon2id,
});

test.after(() => rm(file.path));

test.serial(`${txt}; () => Save the file`, async t => {
    await file.save(target);
    t.pass();
});

test.serial(`${txt}; () => Load the file`, async t => {
    const { options, salt } = await file.load();
    t.is(options.hashLength, 64);
    t.is(options.memoryCost, 2048);
    t.is(options.parallelism, 4);
    t.is(options.timeCost, 9);
    t.is(options.type, Variants.Argon2id);
    t.deepEqual(salt, target.salt);
});