import {Component, Input} from '@angular/core';

import {FormsService} from 'services';

@Component({
    selector    : 'finance-currency-widget',
    templateUrl : './currency-widget.component.html',
    styleUrls   : ['./currency-widget.component.scss']
})

export class CurrencyWidgetComponent {
    @Input() currency: any;

    constructor(private formsService: FormsService) {
    }
}
