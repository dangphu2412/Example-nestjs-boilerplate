import {PaginationContent} from '@packages/restBuilder/types/factory/paginationContentType';
import {ListSortType} from '@packages/restBuilder/types/factory/sortContentType';
import {ListFilterType} from '@packages/restBuilder/types/factory/filterContentType';
import {MainSchema} from '@packages/restBuilder/types/querySchema/MainSchema';
import {AssociateSchema} from '@packages/restBuilder/types/querySchema/AssociateSchema';

export interface QueryContent {
    pagination: PaginationContent;
    sorts: ListSortType;
    filters: ListFilterType;
    search: string;
    main: MainSchema;
    associates: AssociateSchema[]
}
