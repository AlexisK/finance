import {Pipe, PipeTransform} from '@angular/core';

import {helpers} from 'utils';

@Pipe({
    name : 'financeMoney'
})
export class MoneyPipe implements PipeTransform {
    transform(value: any) {
        let isPositive = value >= 0;
        value = Math.abs(value);
        return `${isPositive && '+' || '-'}${Math.floor(value)}.${helpers.toLength(Math.floor(value * 100) % 100)}`;
    }
}

