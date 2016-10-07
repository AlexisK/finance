import {Component, Input} from '@angular/core';

import {PopupPrototype} from 'prototypes';

@Component({
    selector    : 'finance-popup-small',
    templateUrl : './popup-small.component.html',
    styleUrls   : ['./popup-small.component.scss']
})

export class PopupSmallComponent extends PopupPrototype {
    @Input() title: string;
    private interval: any = null;

    private bgClick() {
        clearInterval(this.interval);
        this.interval = setTimeout(() => this.hide(), 10);
    }

    private blockClick() {
        setTimeout(() => clearInterval(this.interval), 1);
    }
}
