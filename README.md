# argon2-hasher

This is a wrapper for [Argon2](https://www.npmjs.com/package/argon2) module. With this package you can:
- Hash `string`, `Buffer`, or any JSON object.
- Validate hashes with an specific configuration.
- Compare the __"deep"__ equality of 2 objects.
- Load and save your current cofiguration in a file.
- Now with __CommonJS__ and __ESM Modules__ support.

## Installation

Simply add this project as a local dependency to your project:
```bash
$ npm i --save argon2-hasher
```

## Hash anything

You can generate hashes from any json plain object. If you want to use a random salt generated with a fixed length, simply give to the `JsonHasher` constructor a number with the desired length _(in bytes)_ of the random salt, and the new instance will has been generated with a new random salt:

```ts
import { Hasher } from 'argon2-hasher';

// A function that receive an object
async function program(obj: any): Promise<void> {
    // Create a new Hasher instance, with
    // a random salt length of 32 bytes.
    const hasher = new Hasher(32);

    // Hashes the incoming object
    const hashed = await hasher.hash(obj);

    // Make whatever you want with the hash or the salt
    console.log('hash ->', hashed.hash.toString('base64'));
    console.log('salt ->', hashed.salt.toString('base64'));
}
```

In cases when you need to use an existing salt (as a `Buffer`), you can give that as a constructor parameter:

```ts
import { Hasher } from 'argon2-hasher';

// A function that receive an object and the salt
async function program(obj: any, salt: Buffer): Promise<void> {
    // Create a new Hasher instance with an existing salt
    const hasher = new Hasher(salt);

    // Hashes the incoming object
    const hashed = await hasher.hash(obj);

    // Make whatever you want with the hash or the salt
    console.log('hash ->', hashed.hash.toString('base64'));
    console.log('salt ->', hashed.salt.toString('base64'));
}
```

## Compare both objects

If you need to check if 2 complex objects are the same, you can use this library this way:


```ts
import { Hasher } from 'argon2-hasher';

// A function that receive an object
async function program(objA: any, objB: any): Promise<void> {
    // Create a new Hasher instance
    const hasher = new Hasher(32);

    // Compare both objects (the result is an boolean)
    const areEqual = await hasher.compare(objA, objB);

    // Use that boolean as you want
    if (areEqual) {
        console.log('Are the same');
    } else {
        console.log('Are different');
    }
}
```

## Save and load your configuration

If you want to save the configuration of your current instance, now you have the `HasherFile` class for that purpose:

### Save configuration

With an instance of `HasherFile` you can save the Hasher current configuration simply using a single method:

```ts
import { Hasher, HasherFile } from 'argon2-hasher';

// An async function with the program
async function program(): Promise<void> {
    // A Hasher instance with a custom configuration
    const originalHasher = new Hasher(32, {
        hashLength: 256,
        memoryCost: 3660
    });

    // Create a new instance to manage your configuration file
    const hasherFile = new HasherFile('./secret.argon2');

    // Save the current configuration
    await hasherFile.save(originalHasher);
}
```

### Load configuration

With `HasherFile` you have 2 ways to load the configuration. One way is using an instance of `HasherFile`:

```ts
import { Hasher, HasherFile } from 'argon2-hasher';

// An async function with the program
async function program(): Promise<void> {
    // The configuration manager
    const hasherFile = new HasherFile('./secret.argon2');

    // Load the current configuration
    const hasher = await hasherFile.load();

    // Now you can hash everything
    const hashed = hasher.hash('jajAJjajaj');
}
```

...or using the static method of the same class:

```ts
import { Hasher, HasherFile } from 'argon2-hasher';

// An async function with the program
async function program(): Promise<void> {
    // Load the current configuration using the static method
    const hasher = await HasherFile.load('./secret.argon2');

    // Now you can hash everything
    const hashed = hasher.hash('jajAJjajaj');
}
```