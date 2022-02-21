import { getInputType } from './get-type';

export function stringify(input: any): string {
    switch (getInputType(input)) {
        case 'undefined':
        case 'boolean':
        case 'number':
        case 'string':
        case 'null':
            return JSON.stringify(input);

        case 'bigint':
            return stringify({
                type: 'BigInt',
                value: input.toString() + 'n'
            });

        case 'object':
            let textObject = '{';
            Object
                .keys(input)
                .sort()
                .forEach((key, i) => {
                    if (i) { textObject += ', '; }
                    textObject += `"${key}": `;
                    textObject += stringify(input[key]);
                });
            
            textObject += '}';
            return textObject;

        case 'array':
            let textArray = '[';
            for (let i = 0; i < input.length; i++) {
                if (i) { textArray += ', '; }
                textArray += stringify(input[i]);
            }
            
            textArray += ']';
            return textArray;
    }
}