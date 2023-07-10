import test from 'ava';
import { stringify } from './stringify.js';

test('true', t => {
    const res = stringify(true);
    t.is(res, 'true');
});

test('false', t => {
    const res = stringify(false);
    t.is(res, 'false');
});