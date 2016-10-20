import {Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {TransactionModel, CurrencyModel} from 'models';
import {ChartFormatService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-chart-widget',
    templateUrl : './chart-widget.component.html',
    styleUrls   : ['./chart-widget.component.scss']
})

export class ChartWidgetComponent implements OnDestroy {
    private subscription: Subscription;
    private currency: string;
    @Input() title: string;
    @Input() transactions: TransactionModel[] = [];

    get ownTransactions() {
        if (this.currency) {
            return this.transactions.filter((transaction: TransactionModel) => (transaction['currency'] === this.currency));
        }
        return [];
    }

    constructor(private db: DatabaseService,
                private chartService: ChartFormatService) {
        this.subscription = this.db.subjects.currency.subscribe((currency: CurrencyModel) => {
            if (!this.currency) {
                this.currency = currency.id;
            }
            this.subscription.unsubscribe();
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
