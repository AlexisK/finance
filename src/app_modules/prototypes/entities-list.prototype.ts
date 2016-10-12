import {StateService} from 'services';

export class EntitiesListPrototype {
    protected state: StateService;
    protected _stateKey: string;
    public formComponent: any;
    public popup: any;

    _AfterViewInit() {
        this.popup.emitter.subscribe((val: boolean) => {
            if ( this.formComponent && !val) {
                this.formComponent.clear();
            }
            this.state[this._stateKey] = val;
        });
    }

    getEntityEditor() {
        return (function(group: any) {
            this.popup.show();
            this.formComponent.edit(group);
        }).bind(this);
    }
}
