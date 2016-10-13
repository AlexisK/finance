import {helpers} from 'utils';

export const timeString = function (date: Date): string {
    return [
        helpers.toLength(date.getHours()),
        helpers.toLength(date.getMinutes())
    ].join(':');
};
