import {Component} from '@angular/core';

import {StateService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-groups',
    templateUrl : './groups.component.html',
    styleUrls   : ['./groups.component.scss']
})

export class GroupsPageComponent {
    constructor(private state: StateService,
                private database: DatabaseService) {
    }
}

export const route = {path : 'groups', component : GroupsPageComponent};

