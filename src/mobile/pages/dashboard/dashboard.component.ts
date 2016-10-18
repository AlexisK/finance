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
    private chartType: ChartType = 'Pie';
    private chartData: any       = {
        'series' : [
            20,
            10,
            30,
            40
        ]
    };
    private chartOptions: any    = {
        // donut      : true,
        // donutWidth            : 60,
        startAngle            : 270,
        showLabel             : true,
        width                 : '100%',
        labelInterpolationFnc : (value: any) => {
            return Math.round(value / this.chartData.series.reduce((a: number, b: number) => a + b) * 100) + '%';
        }
    };

    constructor(private db: DatabaseService) {
    }

    get transactions() {
        return this.db.transactions.sort((a: any, b: any) => {
            return b.timestamp - a.timestamp;
        }).slice(0, 5);
    }
}

export const route = {path : '', component : DashboardPageComponent};

