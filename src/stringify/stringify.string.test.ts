import test from 'ava';
import { stringify } from './stringify.js';

test('"Joder chaval"', t => {
    const res = stringify('Joder chaval');
    t.is(res, '"Joder chaval"');
});

test('"!!!%%&$"', t => {
    const res = stringify('!!!%%&$');
    t.is(res, '"!!!%%&$"');
});

test('"鬼葬"', t => {
    const res = stringify('鬼葬');
    t.is(res, '"鬼葬"');
});