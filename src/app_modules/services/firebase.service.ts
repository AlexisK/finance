import {Injectable} from '@angular/core';

import {firebaseConfig} from 'config';

export const firebase = require('firebase');

@Injectable()
export class FirebaseService {
    public app: any;

    constructor() {
        this.app      = firebase.initializeApp(firebaseConfig);
    }
}
