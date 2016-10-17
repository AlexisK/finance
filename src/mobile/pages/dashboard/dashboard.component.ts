import {Component} from '@angular/core';

import {DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {

    constructor(private db: DatabaseService) {
    }

    get transactions() {
        return this.db.transactions.sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        }).slice(0, 5);
    }
}

export const route = {path : '', component : DashboardPageComponent};

