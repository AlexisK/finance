import {Component, Input} from '@angular/core';

import {DatabaseService, FormsService} from 'services';

const swipeLimit = 70;

@Component({
    selector    : 'finance-report-daily',
    templateUrl : './report-daily.component.html',
    styleUrls   : ['./report-daily.component.scss']
})

export class ReportDailyComponent {
    private swipeOffset = 0;
    @Input() pathPrefix: string;
    @Input() date: Date;

    get transactions() {
        return this.db.getTransactionsPerDate(this.date).sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        });
    }

    constructor(private db: DatabaseService,
                private formsService: FormsService) {
    }

    get swipeRules() {
        return {
            x       : this.swipeX.bind(this),
            xFinish : this.swipeXFinish.bind(this)
        };
    }

    swipeX(pos: any) {
        this.swipeOffset = swipeLimit;
    }

    swipeXFinish() {
        this.swipeOffset = 0;
    }
}
