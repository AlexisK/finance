import {Component} from '@angular/core';

import {firebase, StateService} from 'services';

const icons = [
    'food',
    'coffee',
    'cart',
    'aid-kit',
    'trophy',
    'gift',
    'airplane',
    'enet',
    'earth',
    'leaf',
    'calculator',
    'mobile',
    'terminal',
    'price-tags',
    'headphones',
    'chat',
    'rocket',
    'hammer',
    'lab',
    'clipboard'
];


@Component({
    selector    : 'finance-group-form',
    templateUrl : './group-form.component.html',
    styleUrls   : ['./group-form.component.scss']
})

export class GroupFormComponent {
    private currentGroup: any = null;
    private data = {
        title       : '',
        icon        : icons[0],
        color       : '#ffffff',
        description : ''
    };

    get icons() { return icons; }

    constructor(private state: StateService) {
    }

    onSubmit() {
        let oid     = (this.currentGroup && this.currentGroup.id) || firebase.database().ref().child('group').push().key;
        let updates = {};

        updates['/group/' + oid] = Object.assign({}, this.data);

        firebase.database().ref().update(updates);
    }

    onDelete() {
        if ( this.currentGroup ) {
            if ( confirm('Are you sure want to delete?') ) {
                let updates = {};
                updates['/group/' + this.currentGroup.id] = null;
                firebase.database().ref().update(updates);
            }
        }
    }

    edit(group: any) {
        this.currentGroup = group;
        Object.keys(this.data).forEach((k: string) => {
            this.data[k] = group[k];
        });
    }

    clear() {
        this.data.title = '';
        this.currentGroup = null;
    }
}
