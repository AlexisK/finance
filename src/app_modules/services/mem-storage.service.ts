import {Injectable} from '@angular/core';

import {StorageInterface} from 'interfaces';

@Injectable()
export class MEMStorageService implements StorageInterface {
    public data = {};

    setData(key: string, val: any) {
        this.data[key] = val;
    }

    getData(key: string) {
        return this.data[key];
    }

    getDataByPrefix(key: string) {
        let result = {};

        Object.keys(this.data).forEach((k: string) => {
            if ( k.indexOf(key) === 0 ) {
                result[k.slice(key.length)] = this.data[k];
            }
        });

        return result;
    }

    delData(key: string) {
        delete this.data[key];
    }

    delDataByPrefix(key: string) {
        Object.keys(this.data).forEach((k: string) => {
            if ( k.indexOf(key) === 0 ) {
                delete this.data[k];
            }
        });
    }

}
