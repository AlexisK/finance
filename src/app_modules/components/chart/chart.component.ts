import {Component, Input} from '@angular/core';

import {
    ChartType
} from 'angular2-chartist';

@Component({
    selector    : 'finance-chart',
    templateUrl : './chart.component.html',
    styleUrls   : ['./chart.component.scss']
})

export class ChartComponent {
    private chartType: ChartType = 'Pie';
    @Input() data: any;
    private chartOptions: any    = {
        // donut      : true,
        // donutWidth            : 60,
        startAngle            : 270,
        showLabel             : true,
        // labelInterpolationFnc : (value: any) => {
        //     return Math.round(value / this.data.series.reduce((a: number, b: number) => a + b) * 100) + '%';
        // }
    };

}
