import {ListFilterType} from '@packages/restBuilder/types/factory/filterContentType';
import {FilterTransformer} from '@packages/restBuilder/modules/Transformer/FilterTransformer';
import {Factory} from '@packages/restBuilder/modules/Factory/Factory';

export interface FilterFactory extends Factory<ListFilterType>, FilterTransformer {}
