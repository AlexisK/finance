import {Injectable, NgZone} from '@angular/core';

import {StateService, FirebaseService} from 'services';

@Injectable()
export class AuthService {
    private auth: any;

    constructor(private ngZone: NgZone,
                private state: StateService,
                private db: FirebaseService) {

        this.auth = this.db.app.auth();
        this.subscribeChanges();
    }

    subscribeChanges() {
        this.auth.onAuthStateChanged(() => {
            this.ngZone.run(() => {
                this.state.isAuthorizationChecked = true;
                this.checkLoginStatus();
            });
        });
    }

    login(email: string, pwd: string) {
        return new Promise((resolve, reject) => {
            this.db.app.auth().signInWithEmailAndPassword(email, pwd)
                .catch((err: any) => reject(err))
                .then((user: any) => {

                    if (this.checkLoginStatus()) {
                        resolve(this.state.user);
                        window.location.reload();
                    } else {
                        reject(true);
                    }
                });
        });
    }

    logout(ev?: Event) {
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        return new Promise(resolve => {
            this.db.app.auth().signOut().then(() => {
                this.checkLoginStatus();
                resolve(true);
                window.location.reload();
            });
        });
    }

    checkLoginStatus() {
        let user = this.db.app.auth().currentUser;

        if (user) {
            this.state.setUser(user);
        }

        return this.state.isAuthorized;
    }
}
