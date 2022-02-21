import { assert } from 'chai';
import { randomBytes } from 'crypto';
import { Hasher } from './hasher';

describe('Testing "./hasher"', () => {
    describe('Hash operations', () => {
        it('Hash randomBytes(32)', async () => {
            const input = randomBytes(32);
            const hasher = new Hasher(64);
            const hashed = await hasher.hash(input);
    
            assert.isTrue(await Hasher.verify(hashed, input));
            assert.isFalse(await Hasher.verify(hashed, randomBytes(32)));
        });
        
        it('Hash "The cake is a lie"', async () => {
            const input = 'The cake is a lie';
            const hasher = new Hasher(64);
            const hashed = await hasher.hash(input);
    
            assert.isTrue(await Hasher.verify(hashed, input));
            assert.isFalse(await Hasher.verify(hashed, 'the cake is a lie'));
        });
        
        it("Hash [ 5, 6, 5, 6, 4 ]", async () => {
            const input = [ 5, 6, 5, 6, 4 ];
            const hasher = new Hasher(64);
            const hashed = await hasher.hash(input);
    
            assert.isTrue(await Hasher.verify(hashed, input));
            assert.isFalse(await Hasher.verify(hashed, [ 5, 6, 5, 6, 5 ]));
        });
        
        it("Hash { id: 66, value: 'JajajJA' }", async () => {
            const input = { id: 66, value: 'JajajJA' };
            const hasher = new Hasher(64);
            const hashed = await hasher.hash(input);
    
            assert.isTrue(await Hasher.verify(hashed, input));
            assert.isFalse(await Hasher.verify(hashed, { id: 66, value: 'JajajJa' }));
        });
    });

    describe('Compare operations', () => {
        it('01 compare -> true', async () => {
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
            assert.isTrue(resp);
        });
    
        it('02 compare -> true', async () => {
            const hasher = new Hasher(32);
    
            const a = [ 2, 3, 4, 5 ];
            const b = [ 2, 3, 4, 5 ];
    
            const resp = await hasher.compare(a, b);
            assert.isTrue(resp);
        });
    
        it('03 compare -> false', async () => {
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
            assert.isFalse(resp);
        });
    
        it('04 compare -> false', async () => {
            const hasher = new Hasher(32);
    
            const a = [ 2, 3, 4, 5 ];
            const b = [ 2, 2, 4, 5 ];
    
            const resp = await hasher.compare(a, b);
            assert.isFalse(resp);
        });
    });
});