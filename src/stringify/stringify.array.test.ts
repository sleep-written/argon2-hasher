import test from 'ava';
import { stringify } from './stringify.js';

test('Array 01', t => {
    const res = stringify([ 5, 6, 7, 8 ]);
    t.deepEqual(res, '[5, 6, 7, 8]');
});

test('Array 02', t => {
    const res = stringify([
        { id: 2, value: 'jajaja' },
        { id: 3, value: 'ñeeeee' },
    ]);
    t.deepEqual(res,
        '[{"id": 2, "value": "jajaja"}, '
    +   '{"id": 3, "value": "ñeeeee"}]'
    );
});