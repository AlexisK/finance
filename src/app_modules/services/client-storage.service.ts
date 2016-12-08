import {Injectable} from '@angular/core';

import {StorageInterface} from 'interfaces';

const storageConfig = {
    cookieKey: 'finance',
    cookieExpire: 2592000000
};

/**
 * Client storage uses cookies in order to have compatibility with ios browsers (they have problems using localStorage)
 */

@Injectable()
export class ClientStorageService implements StorageInterface {

    public data: any;


    static _setCookie(name: string, value: string, expire = storageConfig.cookieExpire, path = '') {
        let date = new Date();
        date.setTime(Date.now() + expire);
        let newCookie = `${name}=${value}; expires=${date.toUTCString()}`;
        if (path) {
            newCookie += `; path=${path}`;
        }
        document.cookie = newCookie;
    }

    static _getCookie(name: string) {
        let matchString = `${name}=`;
        let list        = document.cookie.split(';');

        for (let i = 0; i < list.length; i++) {
            let part = list[i].trim();

            if (part.indexOf(matchString) === 0) {
                return part.slice(matchString.length);
            }
        }
        return null;
    }

    constructor() {
        try {
            this.data = JSON.parse(ClientStorageService._getCookie(storageConfig.cookieKey) || '{}');
        } catch (err) {
            this.data = {};
        }
    }

    setData(key: string, val: any) {
        this.data[key] = val;
        ClientStorageService._setCookie(storageConfig.cookieKey, JSON.stringify(this.data));
    }

    getData(key: string) {
        return this.data[key];
    }

    getDataByPrefix(key: string) {
        let result = {};

        Object.keys(this.data).forEach((k: string) => {
            if (k.indexOf(key) === 0) {
                result[k.slice(key.length)] = this.data[k];
            }
        });

        return result;
    }

    delData(key: string) {
        delete this.data[key];
        ClientStorageService._setCookie(storageConfig.cookieKey, JSON.stringify(this.data));
    }

    delDataByPrefix(key: string) {
        Object.keys(this.data).forEach((k: string) => {
            if (k.indexOf(key) === 0) {
                delete this.data[k];
            }
        });
        ClientStorageService._setCookie(storageConfig.cookieKey, JSON.stringify(this.data));
    }


}
