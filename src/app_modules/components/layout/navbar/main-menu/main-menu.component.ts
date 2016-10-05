import {Component} from '@angular/core';

import {StateService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-main-menu',
    templateUrl : './main-menu.component.html',
    styleUrls   : ['./main-menu.component.scss']
})

export class MainMenuComponent {
    constructor(private state: StateService,
                private database: DatabaseService) {}
}
