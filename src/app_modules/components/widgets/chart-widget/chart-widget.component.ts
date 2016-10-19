import {Component, Input} from '@angular/core';

import {TransactionModel} from 'models';
import {ChartFormatService} from 'services';

@Component({
    selector    : 'finance-chart-widget',
    templateUrl : './chart-widget.component.html',
    styleUrls   : ['./chart-widget.component.scss']
})

export class ChartWidgetComponent {
    @Input() title: string;
    @Input() transactions: TransactionModel[] = [];

    constructor(private chartService: ChartFormatService) {
    }
}
