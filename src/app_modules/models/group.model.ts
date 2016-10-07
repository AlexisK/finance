export class GroupModel {
    constructor(public id: string,
                public data: any) {
        Object.assign(this, data);
    }
}
