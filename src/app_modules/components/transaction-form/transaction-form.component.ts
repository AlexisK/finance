import {Component, AfterViewInit} from '@angular/core';

import {helpers} from 'utils';
import {DatabaseService, firebase, StateService} from 'services';

@Component({
    selector    : 'finance-transaction-form',
    templateUrl : './transaction-form.component.html',
    styleUrls   : ['./transaction-form.component.scss']
})

export class TransactionFormComponent implements AfterViewInit {
    private data = {
        amount      : '',
        currency    : '',
        group       : '',
        title       : '',
        date        : null,
        time        : null,
        description : ''
    };

    constructor(private db: DatabaseService,
                private state: StateService) {
    }

    ngAfterViewInit() {
        this.setCurrentData();
    }

    public setCurrentData() {
        let date = new Date();

        this.data.date = [
            helpers.toLength(date.getFullYear(), 4),
            helpers.toLength(date.getMonth() + 1),
            helpers.toLength(date.getDate())
        ].join('-');
        this.data.time = [
            helpers.toLength(date.getHours()),
            helpers.toLength(date.getMinutes())
        ].join(':');
    };

    onSubmit() {
        let oid     = firebase.database().ref().child('transaction').push().key;
        let updates = {};

        let newData = Object.assign({
            author : this.state.user['uid']
        }, this.data);

        console.log(newData, JSON.stringify(newData));

        newData['timestamp'] = ((a: any[]) => new Date(a[0], a[1], a[2], a[3], a[4]))
            (newData.date.split(/\D/g).concat(newData.time.split(/\D/g))) * 1;
        delete newData['date'];
        delete newData['time'];

        updates['/transaction/' + oid] = newData;

        console.log('onSubmit', updates, JSON.stringify(updates));
        firebase.database().ref().update(updates)
            .catch(err => console.log(err))
            .then(data => {
                this.data.title = '';
                this.data.description = '';
                this.data.amount = '';
                // this.state.isTransactionMenuOpen = false;
                console.log(data);
            });
    }
}