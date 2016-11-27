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

    private iterageSortedGroups(transactions: TransactionModel[], todo: Function) {
        let groupResult = this.getGroupResult(transactions);

        Object.keys(groupResult).sort((a: string, b: string) => {
            return groupResult[b] - groupResult[a];
        }).forEach((k: string) => todo(k, groupResult));
    }

    formatChartTransactions(transactions: TransactionModel[]) {
        let labels: any[] = [];
        let series: any[] = [];

        this.iterageSortedGroups(transactions, (k: string, groupResult: any) => {
            labels.push(this.db.storage['group'][k].title);
            series.push(groupResult[k]);
        });

        return {labels, series};
    }

    formatDisplayTransaction(transactions: TransactionModel[]) {
        let result: any[] = [];

        this.iterageSortedGroups(transactions, (k: string, groupResult: any) => {
            result.push({
                group  : this.db.storage['group'][k],
                amount : groupResult[k]
            });
        });

        return result;
    }

    getTotalPrice(transactions: TransactionModel[]) {
        return -transactions.reduce((acc: number, transaction: TransactionModel) => {
            return acc + Math.min(0, transaction['amount']);
        }, 0);
    }
}
