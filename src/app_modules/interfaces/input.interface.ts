import {EventEmitter} from '@angular/core';

export interface InputInterface {
    value: any;
    onInputInit: EventEmitter<any>;
    onInputChange: EventEmitter<any>;
}
