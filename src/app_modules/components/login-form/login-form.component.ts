import {Component, AfterViewInit} from '@angular/core';

import {AuthService, StateService} from 'services';

@Component({
    selector    : 'finance-login-form',
    templateUrl : './login-form.component.html',
    styleUrls   : ['./login-form.component.scss']
})

export class LoginFormComponent implements AfterViewInit {
    private isLoaded = false;
    private data = {
        email : '',
        pwd   : ''
    };

    constructor(private auth: AuthService,
                private state: StateService) {
    }

    ngAfterViewInit() {
        setTimeout(() => this.isLoaded = true, 1000);
    }

    onSubmit() {
        this.auth.login(this.data.email, this.data.pwd)
            .catch(err => {})
            .then(user => {});
    }
}
