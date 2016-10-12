import {Component, ViewChild} from '@angular/core';

import {PopupSmallComponent, TransactionFormComponent} from 'components';
import {DatabaseService, StateService} from 'services';
import {EntitiesListPrototype} from 'prototypes';

@Component({
    selector    : 'finance-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent extends EntitiesListPrototype {
    @ViewChild(TransactionFormComponent) formComponent: any;
    @ViewChild(PopupSmallComponent) popup: any;

    sortFunc(a: any, b: any) {
        return b.timestamp - a.timestamp;
    }

    constructor(state: StateService,
                private db: DatabaseService) {
        super();
        this._stateKey = 'isMainMenuOpen';
        this.state     = state;
    }
}

export const route = {path : '', component : DashboardPageComponent};

