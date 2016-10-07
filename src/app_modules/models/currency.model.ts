export class CurrencyModel {
    constructor(public id: string,
                public data: any) {
        Object.assign(this, data);
    }

    getColorClass(amount: number) {
        if ( amount > 0 ) {
            return 'positive';
        }
        if ( amount < this['warningLimit']) {
            return 'negative';
        }
        return '';
    }
}
