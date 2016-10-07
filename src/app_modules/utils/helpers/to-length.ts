export const toLength = function (val: number, len = 2) {
    let strVal = val.toString();
    return new Array(len - strVal.length + 1).join('0') + strVal;
};
