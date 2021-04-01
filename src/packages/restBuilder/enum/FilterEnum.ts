export enum FilterSign {
    $eq = '=',
    $gt = '>',
    $ls = '<',
    $like = 'LIKE'
}

export type FilterSignType = keyof typeof FilterSign;
