import {Component} from '@angular/core';

import {StateService, AuthService} from 'services';

@Component({
    selector    : 'finance-user-menu',
    templateUrl : './user-menu.component.html',
    styleUrls   : ['./user-menu.component.scss']
})

export class UserMenuComponent {
    constructor(private state: StateService,
                private auth: AuthService) {}
}
