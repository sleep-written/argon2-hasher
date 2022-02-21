import { InputTypes } from './input-types';
import { UnsupportedTypeError } from './unsupported-type-error';

export function getInputType(input: any): InputTypes {
    const typeofInput = typeof input
    switch (typeofInput) {
        case 'undefined':
        case 'boolean':
        case 'bigint':
        case 'number':
        case 'string':
            return typeofInput;
        case 'object':
            if (input === null) {
                return 'null';
            } else if (input instanceof Array) {
                return 'array';
            } else {
                return 'object';
            }
        default:
            throw new UnsupportedTypeError();
    }
}
