import {Component} from '@angular/core';


import {
    ChartistComponent,
    ChartType
} from 'angular2-chartist';

import {DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {
    private chartType: ChartType;
    private chartData: any;

    constructor(private db: DatabaseService) {
        this.chartType = 'Bar';
        this.chartData = {
            'labels' : [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            'series' : [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };
    }

    get transactions() {
        return this.db.transactions.sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        }).slice(0, 5);
    }
}

export const route = {path : '', component : DashboardPageComponent};

