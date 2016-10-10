import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {GroupFormComponent, PopupSmallComponent} from 'components';
import {StateService, DatabaseService} from 'services';

@Component({
    selector    : 'finance-page-groups',
    templateUrl : './groups.component.html',
    styleUrls   : ['./groups.component.scss']
})

export class GroupsPageComponent implements AfterViewInit {
    private _stateKey = 'isGroupMenuOpen';
    @ViewChild(GroupFormComponent) formComponent: any;
    @ViewChild(PopupSmallComponent) popup: any;

    constructor(private state: StateService,
                private db: DatabaseService) {
    }

    ngAfterViewInit() {
        this.popup.emitter.subscribe((val: boolean) => {
            if ( !val) {
                this.formComponent.clear();
            }
            this.state[this._stateKey] = val;
        });
    }

    getGroupEditor() {
        return (function(group: any) {
            this.formComponent.edit(group);
            this.popup.show();
        }).bind(this);
    }
}

export const route = {path : 'groups', component : GroupsPageComponent};

