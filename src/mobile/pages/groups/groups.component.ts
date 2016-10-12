import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {GroupFormComponent, PopupSmallComponent} from 'components';
import {StateService, DatabaseService} from 'services';
import {EntitiesListPrototype} from 'prototypes';

@Component({
    selector    : 'finance-page-groups',
    templateUrl : './groups.component.html',
    styleUrls   : ['./groups.component.scss']
})

export class GroupsPageComponent extends EntitiesListPrototype implements AfterViewInit {
    @ViewChild(GroupFormComponent) formComponent: any;
    @ViewChild(PopupSmallComponent) popup: any;

    constructor(state: StateService,
                private db: DatabaseService) {
        super();
        this._stateKey = 'isGroupMenuOpen';
        this.state = state;
    }

    ngAfterViewInit() {
        this._AfterViewInit();
    }
}

export const route = {path : 'groups', component : GroupsPageComponent};

