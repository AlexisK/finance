import {Pipe, PipeTransform} from '@angular/core';

import {helpers} from 'utils';

const f = function (v: number, l = 2) { return helpers.toLength(v, l); };

@Pipe({
    name : 'financeDate'
})
export class DatePipe implements PipeTransform {
    transform(value: number) {
        let date = new Date(value);
        return `${f(date.getDate())}/${f(date.getMonth() + 1)}`;
    }
}

@Pipe({
    name : 'financeTime'
})
export class TimePipe implements PipeTransform {
    transform(value: number) {
        let date = new Date(value);
        return `${f(date.getHours())}:${f(date.getMinutes())}`;
    }
}

