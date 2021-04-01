import {FilterSignType} from '@packages/restBuilder/enum/FilterEnum';

export interface FilterContentType {
    column: string,
    sign: FilterSignType,
    value: string
}

export interface ListFilterType extends Array<FilterContentType> {
    [x: number]: FilterContentType;
}
