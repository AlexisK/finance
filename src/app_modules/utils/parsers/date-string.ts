import {helpers} from 'utils';

export const dateString = function (date: Date): string {
    return [
        helpers.toLength(date.getFullYear(), 4),
        helpers.toLength(date.getMonth() + 1),
        helpers.toLength(date.getDate())
    ].join('-');
};
