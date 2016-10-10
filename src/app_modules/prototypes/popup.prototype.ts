import {BehaviorSubject} from 'rxjs/Rx';

export class PopupPrototype {
    public shown = false;
    public emitter = new BehaviorSubject(null);

    show() {
        this.shown = true;
        this.emitter.next(true);
    }

    hide() {
        this.shown = false;
        this.emitter.next(false);
    }

    toggle() {
        this.shown = !this.shown;
        this.emitter.next(this.shown);
    }
}
