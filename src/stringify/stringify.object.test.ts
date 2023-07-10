import test from 'ava';
import { stringify } from './stringify.js';

test('Object 01', t => {
    const obj = {
        text: 'jajaja',
        value: 555
    };

    const res = stringify(obj);
    t.deepEqual(res,
        '{"text": "jajaja", "value": 555}'
    );
});

test('Object 02', t => {
    const obj = {
        text: 'jajaja',
        value: 555n
    };

    const res = stringify(obj);
    t.deepEqual(res,
        '{"text": "jajaja", "value": {"type": '
    +   '"BigInt", "value": "555n"}}'
    );
});

test('Object 03', t => {
    const obj = {
        text: 'jajaja',
        value: {
            keys01: [ 55, 66, 77 ],
            keys02: [ 20, 21, 22 ],
        }
    };

    const res = stringify(obj);
    t.deepEqual(res,
        '{"text": "jajaja", "value": {"keys01": '
    +   '[55, 66, 77], "keys02": [20, 21, 22]}}'
    );
});

test('Object 04', t => {
    const obj = {
        text: 'jajaja',
        value: {
            keys01: null,
            keys02: undefined,
        }
    };

    const res = stringify(obj);
    t.deepEqual(res,
        '{"text": "jajaja", "value": {"keys01": '
    +   'null, "keys02": undefined}}'
    );
});

test('Object A === Object B', t => {
    const objA = {
        keyA: 1237,
        keyB: 'loool',
        keyC: false,
    };
    const resA = stringify(objA);

    const objB = {
        keyC: false,
        keyB: 'loool',
        keyA: 1237,
    };
    const resB = stringify(objB);
    t.deepEqual(resA, resB);
});