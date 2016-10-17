import {Component, Input} from '@angular/core';

import {parsers} from 'utils';
import {DatabaseService, FormsService} from 'services';

@Component({
    selector    : 'finance-report-daily',
    templateUrl : './report-daily.component.html',
    styleUrls   : ['./report-daily.component.scss']
})

export class ReportDailyComponent {
    @Input() date: Date;

    get transactions() {
        return this.db.getTransactionsPerDate(this.date).sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        });
    }

    get inputDate() {
        return parsers.dateString(this.date);
    }

    set inputDate(data: string) {
        let dateList = data.split(/\D/g).map((v: string) => +v);

        this.date.setFullYear(dateList[0]);
        this.date.setMonth(dateList[1] - 1);
        this.date.setDate(dateList[2]);
    }

    constructor(private db: DatabaseService,
                private formsService: FormsService) {
    }
}
