import {Component} from '@angular/core';

import {FormsService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-groups',
    templateUrl : './groups.component.html',
    styleUrls   : ['./groups.component.scss']
})

export class GroupsPageComponent {
    constructor(private db: DatabaseService,
                private formsService: FormsService) {
    }

}

export const route = {path : 'groups', component : GroupsPageComponent};

