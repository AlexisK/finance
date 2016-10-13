import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {icons} from 'utils/icons';

import {DatabaseService, StateService} from 'services';

@Component({
    selector      : 'finance-app',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class AppComponent {
    @ViewChild('formFinance') formFinance: any;
    @ViewChild('formTransaction') formTransaction: any;

    get icons() { return icons; }

    constructor(private db: DatabaseService,
                private state: StateService) {
    }
}
