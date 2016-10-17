import {Component, Input} from '@angular/core';

import {FormsService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-transaction-widget',
    templateUrl : './transaction-widget.component.html',
    styleUrls   : ['./transaction-widget.component.scss']
})

export class TransactionWidgetComponent {
    private isOpened = false;
    @Input() transaction: any;

    constructor(private formsService: FormsService,
                private db: DatabaseService) {
    }
}
