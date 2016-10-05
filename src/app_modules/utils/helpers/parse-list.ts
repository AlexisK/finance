const cases = {
    'object' : (data: any) => {
        if (data.constructor === Array) {
            return data;
        }
        let result: any[] = [];
        Object.keys(data).map(k => result.push(data[k]));
        return result;
    },
    'number' : (data: number) => new Array(data).fill(undefined).map((v, k) => k)
};

export const parseList = function (data: any): any[] {
    return cases[typeof(data)](data);
};
