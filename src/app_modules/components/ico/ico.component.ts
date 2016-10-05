import {Component, Input} from '@angular/core';

@Component({
    selector : '[ico]',
    templateUrl: './ico.component.html'
})
export class IcoComponent {
    @Input() ico: string;
}
