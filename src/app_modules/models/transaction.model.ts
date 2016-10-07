import {GroupModel, CurrencyModel, UserModel} from 'models';

export class TransactionModel {
    constructor(public id: string,
                public data: any) {
        Object.assign(this, data);
    }
}
