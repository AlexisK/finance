import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {parsers, helpers} from 'utils';

@Component({
    selector    : 'finance-page-daily',
    templateUrl : './daily.component.html',
    styleUrls   : ['./daily.component.scss']
})

export class DailyPageComponent implements AfterViewInit, OnInit, OnDestroy {
    private pathPrefix = '/#/daily';
    private date: Date;
    private paramsSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngAfterViewInit() {
        helpers.waitToRender().then(this.fetchRoute.bind(this));
    }

    get inputDate() {
        return parsers.dateString(this.date);
    }

    set inputDate(data: string) {
        let dateList = data.split(/\D/g).map((v: string) => +v);

        this.date.setFullYear(dateList[0]);
        this.date.setMonth(dateList[1] - 1);
        this.date.setDate(dateList[2]);
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe((params: any) => {
            let date = new Date(0);
            if (params.date === 'today') {
                let today = new Date();
                date.setFullYear(today.getFullYear());
                date.setMonth(today.getMonth());
                date.setDate(today.getDate());
            } else {
                let dateList = params.date.split(/\D/g);
                date.setFullYear(dateList[0]);
                date.setMonth(dateList[1] - 1);
                date.setDate(dateList[2]);
            }
            this.date = date;
        });
    }


    fetchRoute() {
        if (this.pathPrefix) {
            history.replaceState({}, 'Daily', `${this.pathPrefix}/${parsers.dateString(this.date)}`);
        }
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }
}

export const route = {path : 'daily/:date', component : DailyPageComponent};

