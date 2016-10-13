import {Injectable} from '@angular/core';

import {icons} from 'utils/icons';
import {parsers} from 'utils';
import {StateService} from 'services';

@Injectable()
export class FormsService {
    private _forms: any  = {};
    private _isOpen: any = {};

    get forms() {
        return this._forms;
    }

    get isOpen() {
        return this._isOpen;
    }

    private formsDefaultData = {
        group       : {
            title       : '',
            icon        : icons[0],
            color       : '#ffffff',
            description : ''
        },
        transaction : {
            amount      : '',
            currency    : '',
            group       : '',
            title       : '',
            date        : '',
            time        : '',
            description : ''
        },
        currency    : {
            title        : '',
            warningLimit : -100
        }
    };

    private formsParsers = {
        transaction : {
            toData : (data: any) => {
                let newData = Object.assign({
                    author : this.state.user['uid']
                }, data);

                newData['timestamp'] = ((a: any[]) => new Date(a[0], a[1], a[2], a[3], a[4]))
                    (newData['date'].split(/\D/g).concat(newData['time'].split(/\D/g))) * 1;
                delete newData['date'];
                delete newData['time'];

                return newData;
            },
            toView : (data: any) => {
                let newData = Object.assign({}, data);
                let newDate = new Date(newData.timestamp);

                newData['time'] = parsers.timeString(newDate);
                newData['date'] = parsers.dateString(newDate);
                delete newData['timestamp'];

                return newData;
            }
        }
    };

    constructor(private state: StateService) {}

    getFormConfig(model: string) {
        return {
            parsers : this.formsParsers[model] || {},
            defData : this.formsDefaultData[model] || {}
        };
    }

    registerForm(model: string, entity: any) {
        this._forms[model]  = entity;
        this._isOpen[model] = false;
    }

}
