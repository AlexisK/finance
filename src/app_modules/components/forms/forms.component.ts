import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import {icons} from 'utils/icons';
import {DatabaseService, StateService} from 'services';

@Component({
    selector    : 'finance-forms',
    templateUrl : './forms.component.html',
    styleUrls   : ['./forms.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormsComponent {
    @ViewChild('formFinance') formFinance: any;
    @ViewChild('formTransaction') formTransaction: any;
    @ViewChild('formCurrency') formCurrency: any;

    get icons() { return icons; }

    constructor(private db: DatabaseService,
                private state: StateService) {
    }
}
