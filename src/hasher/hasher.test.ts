import { assert } from 'chai';
import { Hasher } from './hasher';

describe('Testing "./hasher"', () => {
    it('Hash "jajaja"', async () => {
        const input = 'jajaja';
        const hasher = new Hasher(64);
        const hashed = await hasher.hash(input);

        assert.isTrue(await Hasher.verify(hashed, input));
    });
    
    it('Hash "The cake is a lie"', async () => {
        const input = 'The cake is a lie';
        const hasher = new Hasher(64);
        const hashed = await hasher.hash(input);

        assert.isTrue(await Hasher.verify(hashed, input));
    });
});