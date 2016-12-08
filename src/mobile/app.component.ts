import {Component, ViewEncapsulation} from '@angular/core';

import {StateService} from 'services';

@Component({
    selector      : 'finance-app',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class AppComponent {
    constructor(private state: StateService) {
    }
}
