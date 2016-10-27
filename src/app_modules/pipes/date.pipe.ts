import {Pipe, PipeTransform} from '@angular/core';

import {helpers} from 'utils';

const f = function (v: number, l = 2) { return helpers.toLength(v, l); };

const FORMATS = {
    date: 'date',
    month: 'month'
};

@Pipe({
    name : 'financeDate',
    pure: false
})
export class DatePipe implements PipeTransform {
    transform(value: number, format = FORMATS.date) {
        let date = new Date(value);
        if ( format === FORMATS.date ) {
            return `${f(date.getDate())}/${f(date.getMonth() + 1)}/${date.getFullYear()}`;
        }
        if ( format === FORMATS.month ) {
            return `${f(date.getMonth() + 1)}/${date.getFullYear()}`;
        }
    }
}

@Pipe({
    name : 'financeTime',
    pure: false
})
export class TimePipe implements PipeTransform {
    transform(value: number) {
        let date = new Date(value);
        return `${f(date.getHours())}:${f(date.getMinutes())}`;
    }
}

