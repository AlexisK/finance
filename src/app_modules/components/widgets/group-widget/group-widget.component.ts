import {Component, Input} from '@angular/core';

import {FormsService} from 'services';

@Component({
    selector    : 'finance-group-widget',
    templateUrl : './group-widget.component.html',
    styleUrls   : ['./group-widget.component.scss']
})

export class GroupWidgetComponent {
    @Input() group: any;

    constructor(private formsService: FormsService) {
    }
}
