export class GroupModel {
    constructor(public id: string,
                public title: string,
                public description = '',
                public icon = '',
                public color = '') {
    }
}
