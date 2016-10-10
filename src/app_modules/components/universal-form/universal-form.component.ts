import {Component, Input, AfterViewInit} from '@angular/core';

@Component({
    selector    : 'finance-universal-form',
    templateUrl : './universal-form.component.html',
    styleUrls   : ['./universal-form.component.scss']
})

export class UniversalFormComponent implements AfterViewInit {
    private currentRef: any = null;
    @Input() defaultData: any;
    @Input() model: string;

    private data: any;

    constructor() {
    }

    ngAfterViewInit() {
        Object.keys(this.defaultData).forEach((k: string) => this.data[k] = this.defaultData[k]);
    }

    onSubmit() {
        let oid     = (this.currentRef && this.currentRef.id) || firebase.database().ref().child(this.model).push().key;
        let updates = {};

        updates[`/${this.model}/${oid}`] = Object.assign({}, this.data);

        firebase.database().ref().update(updates);
    }

    onDelete() {
        if (this.currentRef) {
            if (confirm('Are you sure want to delete?')) {
                let updates                             = {};
                updates[`/${this.model}/${this.currentRef.id}`] = null;
                firebase.database().ref().update(updates);
            }
        }
    }

    edit(group: any) {
        this.currentRef = group;
        Object.keys(this.data).forEach((k: string) => {
            this.data[k] = group[k];
        });
    }

    clear() {
        this.data.title = '';
        this.currentRef = null;
    }
}
