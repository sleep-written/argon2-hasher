import { assert } from 'chai';
import { JsonHasher } from './json-hasher';

describe('Testing "./json-hasher"', () => {
    it('01 areEquals -> true', async () => {
        const hasher = new JsonHasher(32);

        const a = {
            text: 'hello world',
            value: 555
        };

        const b = {
            text: 'hello world',
            value: 555
        };

        const resp = await hasher.areEqual(a, b);
        assert.isTrue(resp);
    });

    it('02 areEquals -> true', async () => {
        const hasher = new JsonHasher(32);

        const a = [ 2, 3, 4, 5 ];
        const b = [ 2, 3, 4, 5 ];

        const resp = await hasher.areEqual(a, b);
        assert.isTrue(resp);
    });

    it('03 areEquals -> false', async () => {
        const hasher = new JsonHasher(32);

        const a = {
            text: 'hello world',
            value: 555
        };

        const b = {
            text: 'hello world',
            value: 545
        };

        const resp = await hasher.areEqual(a, b);
        assert.isFalse(resp);
    });

    it('04 areEquals -> false', async () => {
        const hasher = new JsonHasher(32);

        const a = [ 2, 3, 4, 5 ];
        const b = [ 2, 2, 4, 5 ];

        const resp = await hasher.areEqual(a, b);
        assert.isFalse(resp);
    });
});