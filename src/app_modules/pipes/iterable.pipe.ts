import {Pipe, PipeTransform} from '@angular/core';

import {helpers} from 'utils';

const CHECK = {
    number : 'number',
    string : 'string',
    object : 'object'
};

@Pipe({
    name : 'financeIterable'
})
export class IterablePipe implements PipeTransform {
    transform(value: any) {
        if (typeof(value) === CHECK.number) {
            return (new Array(value)).fill(1);
        }
        if (typeof(value) === CHECK.string) {
            return value.split('');
        }
        if (typeof(value) === CHECK.object && value.constructor !== Array) {
            console.log(value, helpers.parseList(value));
            return helpers.parseList(value);
        }
        return value;
    }
}

