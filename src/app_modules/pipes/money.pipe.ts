import {Pipe, PipeTransform} from '@angular/core';

import {helpers} from 'utils';

@Pipe({
    name : 'financeMoney'
})
export class MoneyPipe implements PipeTransform {
    transform(value: any) {
        return `${value >= 0 && '+' || ''}${Math.floor(value)}.${helpers.toLength(Math.floor(value * 100) % 100)}`;
    }
}

