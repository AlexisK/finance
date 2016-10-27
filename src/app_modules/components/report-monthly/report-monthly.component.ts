import {Component, Input} from '@angular/core';

import {DatabaseService} from 'services';

@Component({
    selector    : 'finance-report-monthly',
    templateUrl : './report-monthly.component.html',
    styleUrls   : ['./report-monthly.component.scss']
})

export class ReportMonthlyComponent {
    @Input() date: Date;

    get transactions() {
        return this.db.getTransactionsPerMonth(this.date).sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        });
    }

    constructor(private db: DatabaseService) {
    }
}
