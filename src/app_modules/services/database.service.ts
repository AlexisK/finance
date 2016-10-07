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
        this.subscribeModel('currency', (v: any, k: string) => new CurrencyModel(k, v.title, v.warningLimit));
        this.subscribeModel('group', (v: any, k: string) => new GroupModel(k, v.title, v.description, v.icon, v.color));
        this.subscribeModel('transaction', (v: any, k: string) => new TransactionModel(k, v));
    }

    private elementWorker(model: string, builder: Function, key: string, data: any) {
        this.ngZone.run(() => {
            console.log('elementWorker', model, this.storage[model][key] = builder(data, key));
        });
    }

    private subscribeModel(model: string, builder: Function) {
        let ref             = firebase.database().ref(model);
        this.storage[model] = {};

        ref.on('child_added', (data: any) => this.elementWorker(model, builder, data.key, data.val()));
        ref.on('child_changed', (data: any) => this.elementWorker(model, builder, data.key, data.val()));
        ref.on('child_removed', (data: any) => {
            if (this.storage[model] && this.storage[model][data.key]) {
                delete this.storage[model][data.key];
            }
        });
    }
}
