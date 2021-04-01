export const isArrayEmpty = <T>(array: Array<T>) => {
    if (array === null || array === undefined) throw new Error('Array is null or undefined');
    return array.length === 0;
}
