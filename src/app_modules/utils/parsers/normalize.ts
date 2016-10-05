export const normalize = function (val: string): string {
    if ( !val ) { return ''; }
    return val.trim().replace(/\s+/g, ' ');
};
