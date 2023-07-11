import test from 'ava';
import { stringify } from './stringify.js';

test('11n', t => {
    const res = stringify(11n);
    t.deepEqual(res, '{"type": "BigInt", "value": "11n"}');
});

test('-88n', t => {
    const res = stringify(-88n);
    t.deepEqual(res, '{"type": "BigInt", "value": "-88n"}');
});