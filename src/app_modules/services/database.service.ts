import {Injectable, NgZone} from '@angular/core';

import {FirebaseService, firebase} from 'services';
import {CurrencyModel, GroupModel, TransactionModel} from 'models';

interface Storage {
    currency: any;
    transaction: any;
}

@Injectable()
export class DatabaseService {
    public storage: Storage         = <Storage>{};
    public transactionsPerDate: any = {};

    constructor(private ngZone: NgZone,
                private db: FirebaseService) {
        this.subscribeFirebase();
    }

    get calculatedCurrencies() {
        let result: any[] = [];

        Object.keys(this.storage.currency).forEach((key: string) => {
            let amount = 0;
            Object.keys(this.storage.transaction).forEach((id: string) => {
                let transaction = this.storage.transaction[id];

                if (transaction.currency === key) {
                    amount += transaction.amount;
                }
            });
            result.push({
                title : this.storage.currency[key].title,
                amount
            });
        });
        return result;
    }

    get currencies() {
        return Object.keys(this.storage.currency).map(k => this.storage.currency[k]);
    }

    get groups() {
        return Object.keys(this.storage['group']).map(k => this.storage['group'][k]);
    }

    get transactions() {
        return Object.keys(this.storage['transaction']).map(k => this.storage['transaction'][k]);
    }

    getTransactionsPerDate(date: Date) {
        let key = <any>date * 1;
        if (this.transactionsPerDate[key]) {
            return Object.keys(this.transactionsPerDate[key])
                .map(k => this.transactionsPerDate[key][k]);
        }
        return [];
    }

    subscribeFirebase() {
        this.subscribeModel('currency', CurrencyModel);
        this.subscribeModel('group', GroupModel);
        this.subscribeModel('transaction', TransactionModel, {
            onRetrieve : (obj: any, model: string) => {
                let date      = new Date(obj.timestamp);
                let cleanDate = new Date(0);

                cleanDate.setFullYear(date.getFullYear());
                cleanDate.setMonth(date.getMonth());
                cleanDate.setDate(date.getDate());

                let key = <any>cleanDate * 1;

                this.transactionsPerDate[key] =
                    this.transactionsPerDate[key] || {};

                this.transactionsPerDate[key][obj.id] = obj;
            }
        });
    }

    private elementWorker(model: string, innerModel: any, key: string, data: any, params: any) {
        this.ngZone.run(() => {
            // console.log('elementWorker', model, this.storage[model][key] = new innerModel(key, data));
            this.storage[model][key] = new innerModel(key, data);
            if (params.onRetrieve) {
                params.onRetrieve(this.storage[model][key], model);
            }
        });
    }

    private subscribeModel(model: string, innerModel: any, params: any = {}) {
        let ref             = firebase.database().ref(model);
        this.storage[model] = {};

        ref.on('child_added', (data: any) => this.elementWorker(model, innerModel, data.key, data.val(), params));
        ref.on('child_changed', (data: any) => this.elementWorker(model, innerModel, data.key, data.val(), params));
        ref.on('child_removed', (data: any) => {
            if (this.storage[model] && this.storage[model][data.key]) {
                delete this.storage[model][data.key];
            }
        });
    }
}
