import {Component, Input} from '@angular/core';

@Component({
    selector    : 'finance-group-widget',
    templateUrl : './group-widget.component.html',
    styleUrls   : ['./group-widget.component.scss']
})

export class GroupWidgetComponent {
    private isOpened = false;
    @Input() form: any;
    @Input() group: any;

    constructor() {
    }
}
