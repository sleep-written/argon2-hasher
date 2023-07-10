import test from 'ava';
import { Hasher } from './hasher.js';

test('01 compare -> true', async t => {
    const hasher = new Hasher(32);

    const a = {
        text: 'hello world',
        value: 555
    };

    const b = {
        text: 'hello world',
        value: 555
    };

    const resp = await hasher.compare(a, b);
    t.true(resp);
});

test('02 compare -> true', async t => {
    const hasher = new Hasher(32);

    const a = [ 2, 3, 4, 5 ];
    const b = [ 2, 3, 4, 5 ];

    const resp = await hasher.compare(a, b);
    t.true(resp);
});

test('03 compare -> false', async t => {
    const hasher = new Hasher(32);

    const a = {
        text: 'hello world',
        value: 555
    };

    const b = {
        text: 'hello world',
        value: 545
    };

    const resp = await hasher.compare(a, b);
    t.false(resp);
});

test('04 compare -> false', async t => {
    const hasher = new Hasher(32);

    const a = [ 2, 3, 4, 5 ];
    const b = [ 2, 2, 4, 5 ];

    const resp = await hasher.compare(a, b);
    t.false(resp);
});