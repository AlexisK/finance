import {Injectable, NgZone} from '@angular/core';

import {FirebaseService, firebase} from 'services';
import {CofferModel, TransactionGroupModel, TransactionModel} from 'models';

interface Storage {
    coffer: any;
    transaction: any;
}

@Injectable()
export class DatabaseService {
    public storage: Storage = <Storage>{};

    constructor(private ngZone: NgZone,
                private db: FirebaseService) {
        this.subscribeFirebase();
    }

    get coffers() {
        let result: any[] = [];

        Object.keys(this.storage.coffer).forEach((key: string) => {
            let amount = 0;
            Object.keys(this.storage.transaction).forEach((id: string) => {
                let transaction = this.storage.transaction[id];

                if (transaction.coffer === key) {
                    amount += transaction.amount;
                }
            });
            result.push({
                title : key,
                amount
            });
        });
        return result;
    }

    subscribeFirebase() {
        this.subscribeModel('coffer', (v: number, k: string) => new CofferModel(k, v));
        this.subscribeModel('transaction-group', (v: any, k: string) => new TransactionGroupModel(k, v.description));
        this.subscribeModel('transaction', (v: any, k: string) => new TransactionModel(
            k,
            v.group,
            v.author,
            v.coffer,
            v.amount,
            v.description
        ));
    }

    private elementWorker(model: string, builder: Function, key: string, data: any) {
        this.ngZone.run(() => {
            this.storage[model][key] = builder(data, key);
        });
    }

    private subscribeModel(model: string, builder: Function) {
        let ref             = firebase.database().ref(model);
        this.storage[model] = {};

        ref.on('child_added', (data: any) => this.elementWorker(model, builder, data.key, data.val()));
        ref.on('child_changed', (data: any) => this.elementWorker(model, builder, data.key, data.val()));
    }
}
