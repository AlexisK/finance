import {Injectable} from '@angular/core';

import {DatabaseService} from 'services';
import {TransactionModel} from 'models';


@Injectable()
export class ChartFormatService {
    public storage: Storage         = <Storage>{};
    public transactionsPerDate: any = {};

    constructor(private db: DatabaseService) {
    }

    private getGroupResult(transactions: TransactionModel[]) {
        let groupResult: any = {};

        transactions.forEach((transaction: TransactionModel) => {
            groupResult[transaction['group']] = groupResult[transaction['group']] || 0;
            groupResult[transaction['group']] += Math.max(0, -transaction['amount']);
        });

        return groupResult;
    }

    formatChartTransactions(transactions: TransactionModel[]) {
        let groupResult = this.getGroupResult(transactions);

        return {
            'labels' : Object.keys(groupResult).map((k: string) => this.db.storage['group'][k].title),
            'series' : Object.keys(groupResult).map((k: string) => groupResult[k])
        };
    }

    formatDisplayTransaction(transactions: TransactionModel[]) {
        let groupResult = this.getGroupResult(transactions);

        return Object.keys(groupResult).map((k: string) => {
            return {
                group  : this.db.storage['group'][k],
                amount : groupResult[k]
            };
        });
    }
}
