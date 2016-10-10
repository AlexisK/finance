import {Component, ViewChild} from '@angular/core';

import {UniversalFormComponent} from 'components';
import {UniversalizedFormPrototype} from 'prototypes';

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

export class GroupFormComponent extends UniversalizedFormPrototype {
    private data = {
        title       : '',
        icon        : icons[0],
        color       : '#ffffff',
        description : ''
    };

    @ViewChild(UniversalFormComponent) form: any;

    get icons() { return icons; }
}
