import test from 'ava';
import { rm } from 'fs/promises';

import { HasherFile } from './hasher-file.js';
import { Hasher, Variants } from '../hasher/index.js';

const txt = 'salt length =  16; default config';
const file = new HasherFile('./test.case-01.argon2');
const target = new Hasher(16);

test.after(() => rm(file.path));

test.serial(`${txt}; () => Save the file`, async t => {
    await file.save(target);
    t.pass();
});

test.serial(`${txt}; () => Load the file`, async t => {
    const { options, salt } = await file.load();
    t.is(options.hashLength, 32);
    t.is(options.memoryCost, 4096);
    t.is(options.parallelism, 1);
    t.is(options.timeCost, 3);
    t.is(options.type, Variants.Argon2i);
    t.deepEqual(salt, target.salt);
});