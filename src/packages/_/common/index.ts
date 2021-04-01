export const isObjectEmpty = (input: {} | []): boolean => {
    return Object.entries(input).length === 0;
}

/**
 * TODO:
 * B1: loop through array
 * 2: get value of key to added to unique array as a new key
 * 3: value existed set to true
 */

/**
 *
 * @param array Array to be map
 * @param key Key to be distinct
 * @returns Array distinct by key
 */
// export const mapWithDistinctKey = <T>(array: Array<T>, key: keyof T) => {
//     const uniqueKeys: [keyof T: boolean] = <T>{};
//     const result: Array<T> = [];
//     for (let i = 0; i < array.length; i++) {
//         const valueOfKey = array[i][key];
//         if (
//             valueOfKey
//             && uniqueKeys[valueOfKey] != null
//             && uniqueKeys[valueOfKey] != undefined
//         ) {
//             uniqueKeys[valueOfKey] = true;
//             result.push(array[i]);
//         }
//     }

//     return result;
// }
