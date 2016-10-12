import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {UniversalFormComponent} from 'components';
import {UniversalizedFormPrototype} from 'prototypes';
import {helpers} from 'utils';
import {DatabaseService, StateService} from 'services';

@Component({
    selector    : 'finance-transaction-form',
    templateUrl : './transaction-form.component.html',
    styleUrls   : ['./transaction-form.component.scss']
})

export class TransactionFormComponent extends UniversalizedFormPrototype implements AfterViewInit {
    private data = {
        amount      : '',
        currency    : '',
        group       : '',
        title       : '',
        date        : '',
        time        : '',
        description : ''
    };

    @ViewChild(UniversalFormComponent) form: any;

    constructor(private db: DatabaseService,
                private state: StateService) {
        super();
    }

    ngAfterViewInit() {
        this.setCurrentData();
    }

    private getTimeString(date: Date) {
        return [
            helpers.toLength(date.getHours()),
            helpers.toLength(date.getMinutes())
        ].join(':');
    }

    private getDateString(date: Date) {
        return [
            helpers.toLength(date.getFullYear(), 4),
            helpers.toLength(date.getMonth() + 1),
            helpers.toLength(date.getDate())
        ].join('-');
    }

    public setCurrentData() {
        if (!this.form.currentRef) {
            let date = new Date();

            this.form.data.date = this.getDateString(date);
            this.form.data.time = this.getTimeString(date);
        }
    };

    get parsers() {
        return {
            toData : (function (data: any) {
                let newData = Object.assign({
                    author : this.state.user['uid']
                }, data);

                newData['timestamp'] = ((a: any[]) => new Date(a[0], a[1], a[2], a[3], a[4]))
                    (newData['date'].split(/\D/g).concat(newData['time'].split(/\D/g))) * 1;
                delete newData['date'];
                delete newData['time'];

                return newData;
            }).bind(this),
            toView : (function (data: any) {
                let newData = Object.assign({}, data);
                let newDate = new Date(newData.timestamp);

                newData['time'] = this.getTimeString(newDate);
                newData['date'] = this.getDateString(newDate);
                delete newData['timestamp'];

                return newData;
            }).bind(this)
        };
    }
}
