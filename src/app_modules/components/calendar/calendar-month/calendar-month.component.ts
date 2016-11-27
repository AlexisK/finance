import {Component, Input} from '@angular/core';

@Component({
    selector    : 'finance-calendar-month',
    templateUrl : './calendar-month.component.html',
    styleUrls   : ['./calendar-month.component.scss']
})

export class CalendarMonthComponent {
    private daysBefore: number[] = [];
    private daysInside: number[] = [];
    private daysAfter: number[]  = [];
    private inited = false;

    @Input() date: Date;

    constructor() {
    }
}
