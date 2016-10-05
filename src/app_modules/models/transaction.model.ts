import {TransactionGroupModel, CofferModel, UserModel} from 'models';

export class TransactionModel {
    constructor(public id: string,
                public group: TransactionGroupModel,
                public author: UserModel,
                public coffer: CofferModel,
                public amount: number,
                public description = '') {
    }
}
