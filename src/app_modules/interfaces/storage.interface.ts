export interface StorageInterface {
    data: any;

    delData(key: string): void;
    getData(key: string): any;
    setData(key: string, val: any): any;
    getDataByPrefix(key: string): any;
    delDataByPrefix(key: string): void;
}
