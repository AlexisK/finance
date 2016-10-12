import {Injectable, NgZone} from '@angular/core';

import {FirebaseService, firebase} from 'services';
import {CurrencyModel, GroupModel, TransactionModel} from 'models';

interface Storage {
    currency: any;
    transaction: any;
}

@Injectable()
export class DatabaseService {
    public storage: Storage = <Storage>{};

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

    subscribeFirebase() {
        this.subscribeModel('currency', CurrencyModel);
        this.subscribeModel('group', GroupModel);
        this.subscribeModel('transaction', TransactionModel);
    }

    private elementWorker(model: string, innerModel: any, key: string, data: any) {
        this.ngZone.run(() => {
            // console.log('elementWorker', model, this.storage[model][key] = new innerModel(key, data));
            this.storage[model][key] = new innerModel(key, data);
        });
    }

    private subscribeModel(model: string, innerModel: any) {
        let ref             = firebase.database().ref(model);
        this.storage[model] = {};

        ref.on('child_added', (data: any) => this.elementWorker(model, innerModel, data.key, data.val()));
        ref.on('child_changed', (data: any) => this.elementWorker(model, innerModel, data.key, data.val()));
        ref.on('child_removed', (data: any) => {
            if (this.storage[model] && this.storage[model][data.key]) {
                delete this.storage[model][data.key];
            }
        });
    }
}
