import {Component, Input, AfterViewInit} from '@angular/core';

import {firebase} from 'services';

interface Parsers {
    toData?: Function;
    toView?: Function;
}

@Component({
    selector    : 'finance-universal-form',
    templateUrl : './universal-form.component.html',
    styleUrls   : ['./universal-form.component.scss']
})

export class UniversalFormComponent implements AfterViewInit {
    public currentRef: any = null;
    @Input() defaultData: any;
    @Input() model: string;
    @Input() parsers: Parsers = {};

    private data: any = {};

    constructor() {
    }

    ngAfterViewInit() {
        if (this.currentRef) {
            Object.keys(this.defaultData).forEach((k: string) => this.data[k] = this.currentRef[k]);
        } else {
            Object.keys(this.defaultData).forEach((k: string) => this.data[k] = this.defaultData[k]);
        }
    }

    onSubmit() {
        let oid     = (this.currentRef && this.currentRef.id) || firebase.database().ref().child(this.model).push().key;
        let updates = {};
        let newData = Object.assign({}, this.data);

        if (this.parsers.toData) {
            newData = this.parsers.toData(newData);
        }

        console.log(this.data, JSON.stringify(this.data));

        updates[`/${this.model}/${oid}`] = newData;

        firebase.database().ref().update(updates);
    }

    onDelete() {
        if (this.currentRef) {
            if (confirm('Are you sure want to delete?')) {
                let updates                                     = {};
                updates[`/${this.model}/${this.currentRef.id}`] = null;
                firebase.database().ref().update(updates);
            }
        }
    }

    edit(entity: any) {
        console.log(entity);
        if (this.parsers.toView) {
            this.currentRef = this.parsers.toView(entity);
        } else {
            this.currentRef = entity;
        }

        Object.keys(this.data).forEach((k: string) => {
            this.data[k] = this.currentRef[k];
        });
        console.log(this.data);
    }

    clear() {
        this.data.title = '';
        this.currentRef = null;
    }
}
