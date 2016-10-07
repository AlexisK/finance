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
        let oid     = firebase.database().ref().child('group').push().key;
        let updates = {};

        updates['/group/' + oid] = Object.assign({}, this.data);

        firebase.database().ref().update(updates)
            .catch((err: any) => console.log(err))
            .then((data: any) => {
                this.data.title = '';
                // this.state.isGroupMenuOpen = false;
                console.log(data);
            });
    }
}
