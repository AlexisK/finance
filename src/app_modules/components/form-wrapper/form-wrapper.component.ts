import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';

import {helpers} from 'utils';
import {FormsService, firebase} from 'services';
import {PopupSmallComponent} from 'components';

@Component({
    selector    : 'finance-form-wrapper',
    templateUrl : './form-wrapper.component.html',
    styleUrls   : ['./form-wrapper.component.scss']
})

export class FormWrapperComponent implements AfterViewInit {
    private currentRef: any;
    private config: any;
    private data: any;

    @Input() model: string;
    @ViewChild(PopupSmallComponent) popup: PopupSmallComponent;


    constructor(private formsService: FormsService) {
    }

    ngAfterViewInit() {
        helpers.waitToRender().then(() => {
            this.formsService.registerForm(this.model, this);
            this.init();
        });
    }

    init() {
        this.config = this.formsService.getFormConfig(this.model);
        this.data   = {};
        this.clear();
    }

    show() {
        this.clear();
        this.formsService.isOpen[this.model] = true;
    }

    close() {
        this.clear();
        this.formsService.isOpen[this.model] = false;
    }


    edit(entity: any) {
        if (this.config.parsers.toView) {
            this.currentRef = this.config.parsers.toView(entity);
        } else {
            this.currentRef = entity;
        }
        Object.keys(this.config.defData).forEach((k: string) => this.data[k] = this.currentRef[k]);
        this.formsService.isOpen[this.model] = true;
    }

    clear() {
        this.currentRef = null;
        Object.keys(this.config.defData).forEach((k: string) => this.data[k] = this.config.defData[k]());
    }


    doSubmit() {
        let oid     = (this.currentRef && this.currentRef.id) || firebase.database().ref().child(this.model).push().key;
        let updates = {};
        let newData = Object.assign({}, this.data);

        if (this.config.parsers.toData) {
            newData = this.config.parsers.toData(newData);
        }

        console.log(this.data, JSON.stringify(this.data));

        updates[`/${this.model}/${oid}`] = newData;

        firebase.database().ref().update(updates).then(() => {
            this.close();
        });
    }

    doDelete() {
        if (this.currentRef) {
            if (confirm('Are you sure want to delete?')) {
                let updates                                     = {};
                updates[`/${this.model}/${this.currentRef.id}`] = null;
                firebase.database().ref().update(updates).then(() => {
                    this.close();
                });
            }
        }
    }
}
