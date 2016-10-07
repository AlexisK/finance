import {Component} from '@angular/core';

import {firebase, StateService} from 'services';

@Component({
    selector    : 'finance-currency-form',
    templateUrl : './currency-form.component.html',
    styleUrls   : ['./currency-form.component.scss']
})

export class CurrencyFormComponent {
    private data = {
        title        : '',
        warningLimit : -100
    };

    constructor(private state: StateService) {
    }

    onSubmit() {
        let oid     = firebase.database().ref().child('currency').push().key;
        let updates = {};

        updates['/currency/' + oid] = Object.assign({}, this.data);

        firebase.database().ref().update(updates)
            .catch((err: any) => console.log(err))
            .then((data: any) => {
                this.data.title = '';
                // this.state.isCurrencyMenuOpen = false;
                console.log(data);
            });
    }
}