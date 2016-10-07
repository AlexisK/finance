import {Component} from '@angular/core';

import {StateService} from 'services';

import {MainMenuComponent} from './main-menu';
import {UserMenuComponent} from './user-menu';

@Component({
    selector    : 'finance-navbar',
    templateUrl : './navbar.component.html',
    styleUrls   : ['./navbar.component.scss'],
    directives: [MainMenuComponent, UserMenuComponent]
})

export class NavbarComponent {
    constructor(private state: StateService) {
        console.log(state.user);
    }
}
