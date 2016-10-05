export class PopupPrototype {
    public shown: boolean = false;

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }

    toggle() {
        this.shown = !this.shown;
    }
}
