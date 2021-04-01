export interface SortContentType {
    sort: string;
    order: 'ASC' | 'DESC'
}

export interface ListSortType extends Array<SortContentType> {
    [x: number]: SortContentType;
}
