import {Component} from '@angular/core';

import {DatabaseService, FormsService} from 'services';

@Component({
    selector    : 'finance-page-currencies',
    templateUrl : './currencies.component.html',
    styleUrls   : ['./currencies.component.scss']
})

export class CurrenciesPageComponent {
    constructor(private db: DatabaseService,
                private formsService: FormsService) {
    }
}

export const route = {path : 'currencies', component : CurrenciesPageComponent};
