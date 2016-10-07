import {Injectable} from '@angular/core';

import {UserModel} from 'models';

@Injectable()
export class StateService {
    public isAuthorizationChecked = false;
    public isAuthorized           = false;
    public isMenuOpen             = false;
    public isUserMenuOpen         = false;
    public isTransactionMenuOpen  = false;
    public isCurrencyMenuOpen     = false;
    public isGroupMenuOpen        = false;
    public isOnline               = false;

    public user: UserModel;

    public setUser(newUser: any) {
        console.log('setUser', newUser);
        this.user         = newUser;
        this.isAuthorized = true;
    }
}
