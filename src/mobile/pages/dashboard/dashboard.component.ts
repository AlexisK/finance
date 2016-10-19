import {Component} from '@angular/core';

import {DatabaseService, ChartFormatService} from 'services';
import {TransactionModel} from 'models';

@Component({
    selector    : 'finance-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {

    constructor(private db: DatabaseService,
                private chartService: ChartFormatService) {
    }

    get transactions() {
        return this.db.transactions.sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        }).slice(0, 5);
    }

    get thisMonthTransactions() {
        let currDate = this.getDate();
        let toDate   = this.getDate();
        toDate.setMonth(toDate.getMonth() + 1);

        let transactions: TransactionModel[] = [];

        for (; currDate < toDate; currDate.setDate(currDate.getDate() + 1)) {
            transactions = transactions.concat(this.db.getTransactionsPerDate(currDate));
        }

        return transactions;
    }

    private getDate() {
        let date  = new Date(0);
        let today = new Date();
        date.setFullYear(today.getFullYear());
        date.setMonth(today.getMonth());
        date.setDate(1);

        return date;
    }
}

export const route = {path : '', component : DashboardPageComponent};

