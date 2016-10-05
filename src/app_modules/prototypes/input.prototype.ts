import {EventInterface} from 'interfaces';

export class InputPrototype {
    public value: any;
    createEvent(): EventInterface {
        return {
            target : this,
            value  : this.value
        };
    }
}
