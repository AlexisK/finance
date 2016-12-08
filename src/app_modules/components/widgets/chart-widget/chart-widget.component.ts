import {Component, Input, OnDestroy} from '@angular/core';

import {TransactionModel} from 'models';
import {ChartFormatService, DatabaseService, ClientStorageService} from 'services';

@Component({
    selector    : 'finance-chart-widget',
    templateUrl : './chart-widget.component.html',
    styleUrls   : ['./chart-widget.component.scss']
})

export class ChartWidgetComponent implements OnDestroy {
    private _currency: string;
    @Input() title: string;
    @Input() transactions: TransactionModel[] = [];

    get currency() {
        return this._currency;
    }

    set currency(data: string) {
        this.storage.setData('chart-currency', data);
        this._currency = data;
    }

    get ownTransactions() {
        if (this.currency) {
            return this.transactions.filter((transaction: TransactionModel) => (transaction['currency'] === this.currency));
        }
        return [];
    }

    constructor(private storage: ClientStorageService,
                private db: DatabaseService,
                private chartService: ChartFormatService) {
        this._currency = this.storage.getData('chart-currency');

    }

    ngOnDestroy() {
    }
}
