import { assert } from 'chai';
import { stringify } from './stringify.js';

describe('Testing "./stringify"', () => {
    describe('Convert "boolean":', () => {
        it('true', () => {
            const res = stringify(true);
            assert.strictEqual(res, 'true');
        });

        it('false', () => {
            const res = stringify(false);
            assert.strictEqual(res, 'false');
        });
    });

    describe('Convert "number":', () => {
        it('1', () => {
            const res = stringify(1);
            assert.strictEqual(res, '1');
        });

        it('12345', () => {
            const res = stringify(12345);
            assert.strictEqual(res, '12345');
        });

        it('-6.34', () => {
            const res = stringify(-6.34);
            assert.strictEqual(res, '-6.34');
        });
    });

    describe('Convert "bigint":', () => {
        it('11n', () => {
            const res = stringify(11n);
            assert.strictEqual(res, '{"type": "BigInt", "value": "11n"}');
        });

        it('-88n', () => {
            const res = stringify(-88n);
            assert.strictEqual(res, '{"type": "BigInt", "value": "-88n"}');
        });
    });

    describe('Convert "string":', () => {
        it('"Joder chaval"', () => {
            const res = stringify('Joder chaval');
            assert.strictEqual(res, '"Joder chaval"');
        });

        it('"!!!%%&$"', () => {
            const res = stringify('!!!%%&$');
            assert.strictEqual(res, '"!!!%%&$"');
        });

        it('"鬼葬"', () => {
            const res = stringify('鬼葬');
            assert.strictEqual(res, '"鬼葬"');
        });
    });

    describe('Convert "object":', () => {
        it('Object 01', () => {
            const obj = {
                text: 'jajaja',
                value: 555
            };

            const res = stringify(obj);
            assert.strictEqual(res,
                '{"text": "jajaja", "value": 555}'
            );
        });

        it('Object 02', () => {
            const obj = {
                text: 'jajaja',
                value: 555n
            };

            const res = stringify(obj);
            assert.strictEqual(res,
                '{"text": "jajaja", "value": {"type": '
            +   '"BigInt", "value": "555n"}}'
            );
        });

        it('Object 03', () => {
            const obj = {
                text: 'jajaja',
                value: {
                    keys01: [ 55, 66, 77 ],
                    keys02: [ 20, 21, 22 ],
                }
            };

            const res = stringify(obj);
            assert.strictEqual(res,
                '{"text": "jajaja", "value": {"keys01": '
            +   '[55, 66, 77], "keys02": [20, 21, 22]}}'
            );
        });

        it('Object 04', () => {
            const obj = {
                text: 'jajaja',
                value: {
                    keys01: null,
                    keys02: undefined,
                }
            };

            const res = stringify(obj);
            assert.strictEqual(res,
                '{"text": "jajaja", "value": {"keys01": '
            +   'null, "keys02": undefined}}'
            );
        });

        it('Object A === Object B', () => {
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
            assert.strictEqual(resA, resB);
        });
    });

    describe('Convert "array"', () => {
        it('Array 01', () => {
            const res = stringify([ 5, 6, 7, 8 ]);
            assert.strictEqual(res, '[5, 6, 7, 8]');
        });

        it('Array 02', () => {
            const res = stringify([
                { id: 2, value: 'jajaja' },
                { id: 3, value: 'ñeeeee' },
            ]);
            assert.strictEqual(res,
                '[{"id": 2, "value": "jajaja"}, '
            +   '{"id": 3, "value": "ñeeeee"}]'
            );
        });
    });
});