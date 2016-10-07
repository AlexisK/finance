import {Component} from '@angular/core';

import {AuthService, StateService} from 'services';

@Component({
    selector    : 'finance-login-form',
    templateUrl : './login-form.component.html',
    styleUrls   : ['./login-form.component.scss']
})

export class LoginFormComponent {
    private _authTimeout: any = null;
    private isAuthFailed = false;
    private data = {
        email : '',
        pwd   : ''
    };

    constructor(private auth: AuthService,
                private state: StateService) {
    }

    onSubmit() {
        this.auth.login(this.data.email, this.data.pwd)
            .catch(err => {
                this.isAuthFailed = true;
                clearInterval(this._authTimeout);
                this._authTimeout = setTimeout(() => {
                    this.isAuthFailed = false;
                }, 1000);
            })
            .then(user => {});
    }
}
