import test from 'ava';
import { randomBytes } from 'crypto';

import { Hasher } from './hasher.js';

test('Hash randomBytes(32)', async t => {
    const input = randomBytes(32);
    const hasher = new Hasher(64);
    const hashed = await hasher.hash(input);

    t.true(await Hasher.verify(hashed, input));
    t.false(await Hasher.verify(hashed, randomBytes(32)));
});

test('Hash "The cake is a lie"', async t => {
    const input = 'The cake is a lie';
    const hasher = new Hasher(64);
    const hashed = await hasher.hash(input);

    t.true(await Hasher.verify(hashed, input));
    t.false(await Hasher.verify(hashed, 'the cake is a lie'));
});

test("Hash [ 5, 6, 5, 6, 4 ]", async t => {
    const input = [ 5, 6, 5, 6, 4 ];
    const hasher = new Hasher(64);
    const hashed = await hasher.hash(input);

    t.true(await Hasher.verify(hashed, input));
    t.false(await Hasher.verify(hashed, [ 5, 6, 5, 6, 5 ]));
});

test("Hash { id: 66, value: 'JajajJA' }", async t => {
    const input = { id: 66, value: 'JajajJA' };
    const hasher = new Hasher(64);
    const hashed = await hasher.hash(input);

    t.true(await Hasher.verify(hashed, input));
    t.false(await Hasher.verify(hashed, { id: 66, value: 'JajajJa' }));
});