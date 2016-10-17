import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector    : 'finance-page-daily',
    templateUrl : './daily.component.html',
    styleUrls   : ['./daily.component.scss']
})

export class DailyPageComponent implements OnInit, OnDestroy {
    private date: Date;
    private paramsSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe((params: any) => {
            let date = new Date(0);
            if ( params.date === 'today' ) {
                let today = new Date();
                date.setFullYear(today.getFullYear());
                date.setMonth(today.getMonth());
                date.setDate(today.getDate());
            } else {
                let dateList = params.date.split(/\D/g);
                date.setFullYear(dateList[0]);
                date.setMonth(dateList[1]);
                date.setDate(dateList[2]);
            }
            this.date = date;
        });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }
}

export const route = {path : 'daily/:date', component : DailyPageComponent};

