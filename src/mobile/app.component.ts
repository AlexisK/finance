import {Component, ViewEncapsulation} from '@angular/core';

import {FirebaseService, firebase, StateService} from 'services';

@Component({
    selector      : 'finance-app',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class AppComponent {
    constructor(private db: FirebaseService,
                private state: StateService) {
        // firebase.auth().signInWithEmailAndPassword('test@gmail.com', '111111')
        //     .catch(error => console.error(error))
        //     .then(user => {
        //         let ref = firebase.database().ref('coffer');
        //
        //         ref.on('child_added', data => console.log('child_added:\t[', data.key, ': ', data.val(), ']'));
        //         ref.on('child_changed', data => console.log('child_changed:\t[', data.key, ': ', data.val(), ']'));
        //
        //     });


    }
}
