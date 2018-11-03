import {Map, OrderedMap} from 'immutable'

export const fbDateToMap = (data, Record = Map) => {
    console.dir(data)
    return (new OrderedMap(data)).mapEntries(([key, value]) => {
        return [key, new Record(value).set('uid', key)]
    })
}
function hashCode(str) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    let c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

export const converNickToRGB = nick => intToRGB(hashCode(nick))
