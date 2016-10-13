import {Component} from '@angular/core';

import {DatabaseService, FormsService} from 'services';

@Component({
    selector    : 'finance-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {
    sortFunc(a: any, b: any) {
        return b.timestamp - a.timestamp;
    }

    constructor(private db: DatabaseService,
                private formsService: FormsService) {
    }

}

export const route = {path : '', component : DashboardPageComponent};

