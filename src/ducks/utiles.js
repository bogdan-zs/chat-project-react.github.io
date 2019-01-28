import { Map, OrderedMap } from 'immutable';

export const fbDateToMap = (data, Record = Map) => {
    return new OrderedMap(data).mapEntries(([key, value]) => {
        return [key, new Record(value).set('uid', key)];
    });
};
export const fbPointsToMap = data => {
    const points = new OrderedMap(data);
    return points.mapEntries(([key, value]) => {
        return [atob(key), Object.values(value)];
    });
};

function hashCode(str) {
    // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
}

export const converNickToRGB = nick => intToRGB(hashCode(nick));
