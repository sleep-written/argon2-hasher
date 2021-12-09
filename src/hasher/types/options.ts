import { Variants } from './variants';

export interface Options {
    /**
     * The hash length is the length of the hash function output in bytes.
     * The default value is `32`, which produces raw hashes of 32 bytes.
     */
    hashLength?: number;

    /**
     * The time cost is the amount of passes (iterations) used by the
     * hash function. It increases hash strength at the cost of time
     * required to compute.
     * The default value is `3`.
     */
    timeCost?: number;

    /**
     * The amount of memory to be used by the hash function, in KiB. Each thread
     * (see [parallelism](https://github.com/ranisalt/node-argon2/wiki/Options#parallelism))
     * will have a memory pool of this size. Note that large values for highly concurrent
     * usage will cause starvation and thrashing if your system memory gets full.
     * The default value is `4096`, meaning a pool of 4 MiB per thread.
     */
    memoryCost?: number;

    /**
     * The amount of threads to compute the hash on. Each thread has a memory pool
     * with `memoryCost` size. Note that changing it also changes the resulting hash.
     * The default value is 1, meaning a single thread is used.
     */
    parallelism?: number;

    /**
     * The variant of the hash function. Argon2 has several variants with different aims:
     * - `Argon2d` is faster and highly resistant against GPU attacks, which is
     * useful for cryptocurrency.
     * - `Argon2i` is slower and resistant against tradeoff attacks, which is
     * preferred for password hashing and key derivation.
     * - `Argon2id` is a hybrid combination of the above, being resistant against
     * GPU and tradeoff attacks.
     * 
     * The default is `Argon2i`.
     */
    type?:  Variants;
}