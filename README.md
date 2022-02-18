# argon2-json-hasher

Converts any JSON object into a hash, and compares their results. The library use argon2 to generate hashes.

## Installation

Simply add this project as a local dependency:
```bash
$ npm i --save argon2-json-parser
```

## Object to Hash

You can generate hashes from any json plain object. If you want to use a random salt generated with a fixed length, simply give to the `JsonHasher` constructor a number with the desired length _(in bytes)_ of the random salt, and the new instance will has been generated with a new random salt:

```ts
import { JsonHasher } from 'argon2-json-hasher';

// A function that receive an object
async function program(obj: any): Promise<void> {
    // Create a new JsonHasher instance, with
    // a random salt length of 32 bytes.
    const hasher = new JsonHasher(32);

    // Hashes the incoming object
    const hashed = await hasher.hash(obj);

    // Make whatever you want with the hash or the salt
    console.log('hash ->', hashed.hash.toString('base64'));
    console.log('salt ->', hashed.salt.toString('base64'));
}
```

In cases when you need to use an existing salt (as a `Buffer`), you can give that as a constructor parameter:

```ts
import { JsonHasher } from 'argon2-json-hasher';

// A function that receive an object and the salt
async function program(obj: any, salt: Buffer): Promise<void> {
    // Create a new JsonHasher instance with an existing salt
    const hasher = new JsonHasher(salt);

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
import { JsonHasher } from 'argon2-json-hasher';

// A function that receive an object
async function program(objA: any, objB: any): Promise<void> {
    // Create a new JsonHasher instance
    const hasher = new JsonHasher(32);

    // Compare both objects (the result is an boolean)
    const areEqual = await hasher.areEqual(objA, objB);

    // Use that boolean as you want
    if (areEqual) {
        console.log('Are the same');
    } else {
        console.log('Are different');
    }
}
```

## Save your configuration

If you want to save the configuration of your current instance, now you have the `HasherFile` class for that purpose:

```ts
import { JsonHasher, HasherFile } from 'argon2-json-hasher';

// Create an instance to manage your configuration file
const hasherFile = new HasherFile('./secret.argon2');

// An async function with the program
async function program(): Promise<void> {
    // Here's your JsonHasher instance
    const originalHasher = new JsonHasher(32, {
        hashLength: 256,
        memoryCost: 3660
    });

    // To save your current configuration:
    await hasherFile.save(originalHasher);

    // To load the configuration:
    const theSameHasher = await hasherFile.load();
}

```