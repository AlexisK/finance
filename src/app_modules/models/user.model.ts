export class UserModel {
    constructor(public id: string,
                public data: any) {
        Object.assign(this, data);
    }
}
