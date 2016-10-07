export class CurrencyModel {
    constructor(public id: string,
                public title: string,
                public warningLimit = 0) {
    }

    getColorClass(amount: number) {
        if ( amount > 0 ) {
            return 'positive';
        }
        if ( amount < this.warningLimit ) {
            return 'negative-big';
        }
        return 'negative';
    }
}
