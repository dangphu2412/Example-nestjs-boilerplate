import {ListSortType} from '@packages/restBuilder/types/factory/sortContentType';
import {SortTransformer} from '@packages/restBuilder/modules/Transformer/SortTransformer';
import {Factory} from '@packages/restBuilder/modules/Factory/Factory';

export interface SortFactory extends Factory<ListSortType>, SortTransformer {}
