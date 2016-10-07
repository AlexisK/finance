import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {GroupFormComponent} from 'components';
import {StateService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-groups',
    templateUrl : './groups.component.html',
    styleUrls   : ['./groups.component.scss']
})

export class GroupsPageComponent implements AfterViewInit {
    @ViewChild(GroupFormComponent) formComponent: any;

    constructor(private state: StateService,
                private db: DatabaseService) {
    }

    ngAfterViewInit() {

    }
}

export const route = {path : 'groups', component : GroupsPageComponent};

