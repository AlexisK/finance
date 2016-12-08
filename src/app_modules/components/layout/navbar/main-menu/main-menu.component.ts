import {Component} from '@angular/core';

import {StateService, DatabaseService, AuthService} from 'services';

const tms = 250;

@Component({
    selector    : 'finance-main-menu',
    templateUrl : './main-menu.component.html',
    styleUrls   : ['./main-menu.component.scss']
})

export class MainMenuComponent {
    get isOpened() {
        return this.state.isMainMenuOpen;
    }

    set isOpened(data: boolean) {
        this.state.isMainMenuOpen = data;
    }

    constructor(private state: StateService,
                private database: DatabaseService,
                private auth: AuthService) {}

}
