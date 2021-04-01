import {ListSortType} from '@packages/restBuilder/types/factory/sortContentType';
import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {Transformer} from '@packages/restBuilder/modules/Transformer/Transformer';

export interface SortTransformer extends Transformer<RequestFormatType, ListSortType> {}
