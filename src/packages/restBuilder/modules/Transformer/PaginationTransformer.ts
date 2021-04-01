import {RequestFormatType} from '@packages/restBuilder/types/factory/requestFormatType';
import {PaginationContent} from '@packages/restBuilder/types/factory/paginationContentType';
import {Transformer} from '@packages/restBuilder/modules/Transformer/Transformer';

export interface PaginationTransformer extends Transformer<RequestFormatType, PaginationContent> {
}
