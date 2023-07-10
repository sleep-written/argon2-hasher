import test from 'ava';
import { stringify } from './stringify.js';

test('1', t => {
    const res = stringify(1);
    t.is(res, '1');
});

test('12345', t => {
    const res = stringify(12345);
    t.is(res, '12345');
});

test('-6.34', t => {
    const res = stringify(-6.34);
    t.is(res, '-6.34');
});