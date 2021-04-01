import {PaginationTransformer} from '@packages/restBuilder/modules/Transformer/PaginationTransformer';
import {PaginationContent} from '@packages/restBuilder/types/factory/paginationContentType';
import {Factory} from '@packages/restBuilder/modules/Factory/Factory';

export interface PaginationFactory extends Factory<PaginationContent>, PaginationTransformer {
}
