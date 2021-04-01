import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {ListFilterType} from '@packages/restBuilder/types/factory/filterContentType';
import {Transformer} from '@packages/restBuilder/modules/Transformer/Transformer';

export interface FilterTransformer extends Transformer<RequestFormatType, ListFilterType> {}
